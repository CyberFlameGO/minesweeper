import React from "react";
import flag from "./assets/flag.svg";
import { GameState } from "./Minesweeper";

interface CellProps {
    value: number;
    open: boolean;
    flagged: boolean;
    gameState: GameState;
}

const Cell: React.FC<CellProps> = ({ value, open, flagged, gameState }) => {
    return <td>{flagged && <img src={flag} alt={flag} />}</td>;
};

export default Cell;
