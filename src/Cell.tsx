import React from "react";
import className from "./util/className";
import { ICell } from "./util/board";
import bomb from "./assets/bomb.png";
import flag from "./assets/flag.svg";

interface CellProps {
    cell: ICell;
    onClick: React.EventHandler<React.MouseEvent>;
}

const colors: { [key: number]: string } = {
    1: "#0000FF",
    2: "#007B00",
    3: "#FF0000",
    4: "#00007B",
    5: "#7B0000",
    6: "#007B7B",
    7: "#000000",
    8: "#7B7B7B",
};

const Cell: React.FC<CellProps> = ({ cell, onClick }) => {
    const { value, open } = cell;

    const openCell = (event: React.MouseEvent) => {
        onClick(event);
    };

    return (
        <div
            className={
                "cell" + className({ open, bomb: open && cell.value === -1 })
            }
            onMouseDown={openCell}
            style={{ color: colors[value] }}
        >
            {open &&
                value !== 0 &&
                (value !== -1 ? value : <img src={bomb} alt="bomb" />)}

            {!open && cell.flagged && <img src={flag} alt="flag" />}
        </div>
    );
};

export default Cell;
