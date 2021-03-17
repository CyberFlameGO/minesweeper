import React, { useState } from "react";
import { array2d } from "./util/array";
import { addBombs, calculateValues } from "./util/board";
import { pipe } from "./util/functions";
import "./Minesweeper.scss";

const Minesweeper: React.FC<{}> = () => {
    const [board] = useState(() =>
        pipe(array2d(16)(16)(0), addBombs(20), calculateValues)
    );

    return (
        <table id="Minesweeper">
            {board.map((row) => (
                <tr>
                    {row.map((x) => (
                        <td>{x}</td>
                    ))}
                </tr>
            ))}
        </table>
    );
};

export default Minesweeper;
