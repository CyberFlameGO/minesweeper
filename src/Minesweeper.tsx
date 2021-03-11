import React, { useState } from "react";
import Cell from "./Cell";
import { ICell, setupBoard, openSurroundingZeros, baseBoard } from "./board";

const WIDTH = 16;
const HEIGHT = 16;

const Minesweeper: React.FC = () => {
    const [started, setStarted] = useState(false);
    const [lost, setLost] = useState(false);

    const [board, setBoard] = useState(baseBoard(WIDTH, HEIGHT));

    const handleClick = (x: number, y: number, cell: ICell) => () => {
        if (lost) return;

        if (!started) {
            const newBoard = setupBoard({
                width: WIDTH,
                height: HEIGHT,
                mines: 50,
                click: { x, y },
            });

            openSurroundingZeros(x, y, newBoard);

            setBoard(newBoard);
            setStarted(true);
            return;
        }

        const newBoard = board.slice();

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

            setLost(true);
        }

        setBoard(newBoard);
    };

    return (
        <div className={`board ${lost ? "lost" : ""}`}>
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
