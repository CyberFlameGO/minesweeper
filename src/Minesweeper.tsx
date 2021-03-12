import React, { useState } from "react";
import Cell from "./Cell";
import {
    ICell,
    setupBoard,
    openSurroundingZeros,
    baseBoard,
    isWin,
} from "./board";

const State = {
    NOT_STARTED: -2,
    LOSS: -1,
    PLAYING: 0,
    WIN: 1,
};

const WIDTH = 16;
const HEIGHT = 16;

const Minesweeper: React.FC = () => {
    const [gameState, setGameState] = useState<number>(State.NOT_STARTED);

    const [board, setBoard] = useState(baseBoard(WIDTH, HEIGHT));

    const handleClick = (x: number, y: number, cell: ICell) => (
        event: React.MouseEvent
    ) => {
        const leftClick = event.button === 0;
        const rightClick = event.button === 2;

        if (gameState === State.NOT_STARTED) {
            if (leftClick) {
                const newBoard = setupBoard({
                    width: WIDTH,
                    height: HEIGHT,
                    mines: 10,
                    click: { x, y },
                });

                openSurroundingZeros(x, y, newBoard);

                setBoard(newBoard);
                setGameState(State.PLAYING);
            }
        }

        if (gameState !== State.PLAYING) return;

        const newBoard = board.slice();

        if (leftClick && !cell.flagged) {
            cell.open = true;

            if (cell.value === 0) {
                openSurroundingZeros(x, y, board);
            } else if (cell.value === -1) {
                board.forEach((row) =>
                    row.forEach((cell) => {
                        if (cell.value === -1) {
                            cell.open = true;
                        }
                    })
                );

                setGameState(State.LOSS);
            }
        } else if (rightClick) {
            cell.flagged = !cell.flagged;
        }

        if (isWin(newBoard)) {
            console.log("win");
            setGameState(State.WIN);
        }

        setBoard(newBoard);
    };

    return (
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
    );
};

export default Minesweeper;
