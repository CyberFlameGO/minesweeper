import React from "react";
import bombImage from "./assets/bomb.png";
import flag from "./assets/flag.svg";
import notBomb from "./assets/not-bomb.png";
import { className } from "./util/functions";
import { Range } from "./util/types";

interface CellProps {
    value: number;
    open: boolean;
    red: boolean;
    flagged: boolean;
    lost: boolean;
    onLeftClick: React.EventHandler<React.MouseEvent>;
    onRightClick: React.EventHandler<React.MouseEvent>;
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

const Cell: React.FC<CellProps> = ({
    value,
    onLeftClick,
    onRightClick,
    open,
    flagged,
    red,
    lost,
}) => {
    const color = value > 0 ? COLORS[value as Range<1, 9>] : "";
    const bomb = value === -1;

    const isOpen = open || (lost && ((flagged && !bomb) || (!flagged && bomb)));

    const mouseDown = (event: React.MouseEvent) =>
        event.button === 2 && onRightClick(event);

    const mouseUp = (event: React.MouseEvent) =>
        event.button === 0 && onLeftClick(event);

    return (
        <td
            className={className({ open: isOpen, red, flagged })}
            style={open ? { color } : {}}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
        >
            {!(lost && !bomb) && !open && flagged && (
                <img src={flag} alt="flag" />
            )}
            {open && value > 0 && value}

            {lost && flagged && !bomb && <img src={notBomb} alt="not bomb" />}
            {lost && !flagged && bomb && <img src={bombImage} alt="bomb" />}
        </td>
    );
};

export default Cell;
