import React from "react";
import Cell from "./Cell";
import Table from "./components/Table";
import { array2d } from "./util/array";
import { getStoredState, useStoredState } from "./util/storedState";
import "./Minesweeper.scss";
import Borders from "./Borders";

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

const Minesweeper: React.FC = () => {
    const width = getStoredState("width", 16);
    const height = getStoredState("height", 16);
    const mines = getStoredState("mines", 15);

    const [board, setBoard, clearStoredBoard] = useStoredState("board", () =>
        array2d(width, height, { value: 0, open: false, flagged: false })
    );

    const [gameState, setGameState, clearStoredGameState] = useStoredState(
        "state",
        GameState.NOT_STARTED
    );

    return (
        <Borders>
            <Table id="Minesweeper">
                {board.map((row, y) => (
                    <tr key={y}>
                        {row.map((cell, x) => (
                            <Cell {...cell} gameState={gameState} key={x} />
                        ))}
                    </tr>
                ))}
            </Table>
        </Borders>
    );
};

export default Minesweeper;
