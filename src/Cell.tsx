import React from "react";
import { GameState } from "./Minesweeper";
import { className } from "./util/functions";
import match from "./util/functions/match";
import { Range } from "./util/types";

import flagImage from "./assets/flag.svg";
import bombImage from "./assets/bomb.png";
import notBombImage from "./assets/not-bomb.png";

interface CellProps {
    value: number;
    open: boolean;
    flagged: boolean;
    gameState: GameState;
    onLeftClick: React.EventHandler<React.MouseEvent>;
    onRightClick: React.EventHandler<React.MouseEvent>;
    onMiddleClick: React.EventHandler<React.MouseEvent>;
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

const image = (src: string, alt = "image") => (
    <img src={src} alt={alt} draggable={false} />
);

const Cell: React.FC<CellProps> = ({
    value,
    open,
    flagged,
    gameState,
    onRightClick,
    onLeftClick,
    onMiddleClick,
}) => {
    const color = value > 0 ? COLORS[value as Range<1, 9>] : "";
    const lost = gameState === GameState.LOST;
    const bomb = value === -1;

    const onMouseDown = (event: React.MouseEvent) =>
        match(event.button)
            .on(2, onRightClick, event)
            .on(1, onMiddleClick, event);

    const onMouseUp = (event: React.MouseEvent) =>
        event.button === 0 && onLeftClick(event);

    const falseFlag = flagged && !bomb;
    const nonFlaggedBomb = !flagged && bomb;

    return (
        <td
            style={open ? { color } : {}}
            className={className({ open, red: lost && open && bomb })}
            onMouseUp={onMouseUp}
            onMouseDown={onMouseDown}
        >
            {flagged && !(lost && falseFlag) && image(flagImage, "flag")}

            {open && value > 0 && value}
            {lost && falseFlag && image(notBombImage, "false flag")}
            {lost && nonFlaggedBomb && image(bombImage, "bomb")}
        </td>
    );
};

export default Cell;
