import React, { useCallback, useEffect } from "react";
import Cell from "./Cell";
import Table from "./components/Table";
import { array2d } from "./util/array";
import { getStoredState, useStoredState } from "./util/storedState";
import "./Minesweeper.scss";
import Borders from "./Borders";
import match from "./util/functions/match";
import { either, preventDefault } from "./util/functions";
import { pipe } from "./util/functions/pipe";
import {
    addBombsPercent,
    calculateValues,
    clearClick,
    won,
} from "./util/board";

export interface BoardCell {
    value: number;
    open: boolean;
    flagged: boolean;
}

export enum GameState {
    NOT_STARTED,
    PLAYING,
    WON,
    LOST,
}

const emptyBoard = (width: number, height: number): BoardCell[][] =>
    array2d(width, height, { value: 0, open: false, flagged: false });

const Minesweeper: React.FC = () => {
    const width = getStoredState("width", 16);
    const height = getStoredState("height", 16);
    const mines = getStoredState("mines", 15);

    const [board, setBoard, clearStoredBoard] = useStoredState("board", () =>
        pipe(addBombsPercent(mines), calculateValues)(emptyBoard(width, height))
    );

    const [gameState, setGameState, clearStoredGameState] = useStoredState(
        "gameState",
        GameState.NOT_STARTED
    );

    useEffect(() => {
        match(gameState).on(
            either<GameState>(GameState.LOST, GameState.WON),
            () => {
                clearStoredBoard();
                clearStoredGameState();
            }
        );
    }, [clearStoredBoard, clearStoredGameState, gameState]);

    const updateCell = useCallback(
        (x: number, y: number) => (
            newValues: {
                [key in keyof BoardCell]?: any;
            }
        ) => {
            const newBoard = board.slice();
            const previousCell = newBoard[y][x];
            const newCell = { ...previousCell, ...newValues };

            newBoard[y][x] = newCell;
            setBoard(newBoard);

            if (newCell.value === -1 && newCell.open) {
                setGameState(GameState.LOST);
            }

            if (newCell.flagged !== previousCell.flagged && won(board)) {
                setGameState(GameState.WON);
                console.log("win");
            }
        },
        [board, setBoard, setGameState]
    );

    const openCell = (x: number, y: number) => updateCell(x, y)({ open: true });
    const setFlagged = (x: number, y: number, flagged: boolean) =>
        updateCell(x, y)({ flagged });

    const leftClickHandler = (x: number, y: number) => () =>
        match(gameState)
            .on(GameState.NOT_STARTED, () => {
                setBoard(clearClick(board)(x, y));
                openCell(x, y);
                setGameState(GameState.PLAYING);
            })
            .on(GameState.PLAYING, () => {
                if (!board[y][x].flagged) {
                    openCell(x, y);
                }
            });

    const rightClickHandler = (x: number, y: number) => () =>
        match(gameState).on(
            GameState.PLAYING,
            () => !board[y][x].open && setFlagged(x, y, !board[y][x].flagged)
        );

    const middleClickHandler = (x: number, y: number) => () => match(gameState);

    return (
        <Borders>
            <Table id="Minesweeper" onContextMenu={preventDefault}>
                {board.map((row, y) => (
                    <tr key={y}>
                        {row.map((cell, x) => (
                            <Cell
                                {...cell}
                                gameState={gameState}
                                onLeftClick={leftClickHandler(x, y)}
                                onRightClick={rightClickHandler(x, y)}
                                onMiddleClick={middleClickHandler(x, y)}
                                key={x}
                            />
                        ))}
                    </tr>
                ))}
            </Table>
        </Borders>
    );
};

export default Minesweeper;
