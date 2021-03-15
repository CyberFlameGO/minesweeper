import React, { useCallback, useEffect, useState } from "react";
import Borders from "./Borders";
import Cell from "./Cell";
import { createHandleClickFactory } from "./createHandleClickFactory";
import { baseBoard, openSurroundingZeros, setupBoard } from "./util/board";

export enum GameState {
    NOT_STARTED = -2,
    LOSS = -1,
    PLAYING = 0,
    WIN = 1,
}

const Minesweeper: React.FC = () => {
    const [width] = useState(16);
    const [height] = useState(16);
    const [mines] = useState(64);

    const [gameState, setGameState] = useState<GameState>(
        GameState.NOT_STARTED
    );
    const [board, setBoard] = useState(() => baseBoard(width, height));

    const createBoard = useCallback(
        (click: { x: number; y: number }) => {
            const board = setupBoard({ width, height, mines, click });
            openSurroundingZeros(click.x, click.y, board);

            return board;
        },
        [mines, height, width]
    );

    const handleClick = createHandleClickFactory({
        gameState,
        setGameState,
        board,
        setBoard,
        createBoard,
    });

    useEffect(() => {
        if (gameState === GameState.NOT_STARTED) {
            setBoard(baseBoard(width, height));
        }
    }, [width, height, gameState]);

    return (
        <>
            <Borders>
                <div
                    className="board"
                    onContextMenu={(event) => event.preventDefault()}
                >
                    {board.map((row, y) => (
                        <div className="row" key={y}>
                            {row.map((cell, x) => (
                                <Cell
                                    cell={cell}
                                    key={x}
                                    onClick={handleClick(x, y, cell)}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </Borders>

            {gameState === GameState.WIN && <h1>You won!</h1>}
            {gameState === GameState.LOSS && <h1>You lost!</h1>}
        </>
    );
};

export default Minesweeper;
