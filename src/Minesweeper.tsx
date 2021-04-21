import React from "react";
import Table from "./components/Table";
import { array2d } from "./util/array";
import { getStoredState, useStoredState } from "./util/storedState";

export interface BoardCell {
    value: number;
    open: boolean;
    flagged: boolean;
}

interface MinesweeperProps {}

const Minesweeper: React.FC<MinesweeperProps> = () => {
    const width = getStoredState("width", 16);
    const height = getStoredState("height", 16);
    const mines = getStoredState("mines", 15);

    const [board, setBoard, clearStoredBoard] = useStoredState("board", () =>
        array2d(width, height, { value: 0, open: false, flagged: false })
    );

    return <Table></Table>;
};

export default Minesweeper;
