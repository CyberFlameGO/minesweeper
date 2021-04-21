import React, { useCallback } from "react";
import Cell from "./Cell";
import Table from "./components/Table";
import { array2d } from "./util/array";
import { getStoredState, useStoredState } from "./util/storedState";
import "./Minesweeper.scss";
import Borders from "./Borders";
import match from "./util/functions/match";
import { either, preventDefault } from "./util/functions";
import { pipe } from "./util/functions/pipe";

export interface BoardCell {
    value: number;
    open: boolean;
    flagged: boolean;
}

export enum GameState {
    NOT_STARTED,
    STARTED,
    WON,
    LOST,
}

const randomizeBoard = (board: BoardCell[][]) =>
    board.map((row) =>
        row.map(({ ...values }) => ({
            ...values,
            value: Math.floor(Math.random() * 10 - 1),
        }))
    );

const emptyBoard = (width: number, height: number) =>
    array2d(width, height, { value: 0, open: false, flagged: false });

const Minesweeper: React.FC = () => {
    localStorage.clear();

    const width = getStoredState("width", 16);
    const height = getStoredState("height", 16);
    const mines = getStoredState("mines", 15);

    const [board, setBoard, clearStoredBoard] = useStoredState("board", () =>
        pipe(randomizeBoard)(emptyBoard(width, height))
    );

    const [gameState, setGameState, clearStoredGameState] = useStoredState(
        "gameState",
        GameState.STARTED
    );

    const updateCell = useCallback(
        (x: number, y: number) => (
            newValues: {
                [key in keyof BoardCell]?: any;
            }
        ) => {
            const newBoard = board.slice();
            newBoard[y][x] = { ...newBoard[y][x], ...newValues };
            setBoard(newBoard);
        },
        [board, setBoard]
    );

    const leftClickHandler = (x: number, y: number) => () =>
        match(gameState).on(either<GameState>(GameState.STARTED), () => {
            if (!board[y][x].flagged) {
                updateCell(x, y)({ open: true });

                if (board[y][x].value === -1) setGameState(GameState.LOST);
            }
        });

    const rightClickHandler = (x: number, y: number) => () =>
        match(gameState).on(GameState.STARTED, () => {
            if (!board[y][x].open) {
                updateCell(x, y)({ flagged: !board[y][x].flagged });
            }
        });

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
