import React, { useState } from "react";
import { array2d } from "./util/array";
import {
    addBombs,
    calculateValue,
    calculateValues,
    surroundingSquares,
} from "./util/board";
import { pipe } from "./util/functions";
import "./Minesweeper.scss";
import Cell from "./Cell";

const Minesweeper: React.FC<{}> = () => {
    const [board, setBoard] = useState(() =>
        pipe(array2d(16)(16)(0), addBombs(20), calculateValues)
    );

    const handleClick = (clickX: number, clickY: number) => () => {
        if (board[clickY][clickX] === -1) {
            const calc = calculateValue(board);

            const newBoard = board.slice();
            newBoard[clickY][clickX] = 0;

            surroundingSquares(board)(clickX, clickY).forEach(
                ({ x, y }) => (newBoard[y][x] = calc(x, y))
            );

            setBoard(newBoard);
        }
    };

    return (
        <table id="Minesweeper">
            <tbody>
                {board.map((row, y) => (
                    <tr key={y}>
                        {row.map((value, x) => (
                            <Cell
                                value={value}
                                onClick={handleClick(x, y)}
                                key={x}
                            />
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Minesweeper;
