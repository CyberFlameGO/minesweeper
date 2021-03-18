import React, { useState } from "react";
import { array2d } from "./util/array";
import { addBombs, calculateValues, clearClick } from "./util/board";
import { pipe } from "./util/functions";
import "./Minesweeper.scss";
import Cell from "./Cell";
import match from "./util/functions/match";

enum GameState {
    NOT_STARTED,
    STARTED,
}

const Minesweeper: React.FC<{}> = () => {
    const [board, setBoard] = useState(() =>
        pipe(array2d(16)(16)(0), addBombs(20), calculateValues)
    );

    const [gameState, setGameState] = useState(GameState.NOT_STARTED);

    const handleClick = (clickX: number, clickY: number) => () => {
        match(gameState)
            .on(GameState.NOT_STARTED, () => {
                setBoard(clearClick(board)(clickX, clickY));
                setGameState(GameState.STARTED);
            })
            .on(GameState.STARTED, () => {
                console.log("Started");
            });
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
