import React, { useState } from "react";
import { array2d } from "./util/array";
import { addBombs, calculateValues } from "./util/board";
import { pipe } from "./util/functions";
import "./Minesweeper.scss";
import Cell from "./Cell";

const Minesweeper: React.FC<{}> = () => {
    const [board] = useState(() =>
        pipe(array2d(16)(16)(0), addBombs(20), calculateValues)
    );

    const handleClick = (x: number, y: number) => () => {
        console.log(x, y);
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
