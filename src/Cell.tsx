import React from "react";
import bomb from "./assets/bomb.png";
import { className } from "./util/functions";
import { Range } from "./util/types";

interface Props {
    value: number;
    open: boolean;
    red: boolean;
    onClick: React.EventHandler<React.MouseEvent>;
}

const COLORS = {
    1: "#0000FF",
    2: "#007B00",
    3: "#FF0000",
    4: "#00007B",
    5: "#7B0000",
    6: "#007B7B",
    7: "#000000",
    8: "#7B7B7B",
};

const Cell: React.FC<Props> = ({ value, onClick, open, red }) => {
    const color = value > 0 ? COLORS[value as Range<1, 9>] : "";

    return (
        <td
            className={className({ open, red })}
            style={open ? { color } : {}}
            onMouseUp={onClick}
        >
            {open && value === -1 && <img src={bomb} alt="bomb" />}
            {open && value > 0 && value}
        </td>
    );
};

export default Cell;
