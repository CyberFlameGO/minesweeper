import React from "react";
import bomb from "./assets/bomb.png";
import { Range } from "./util/types";

interface Props {
    value: number;
    [key: string]: any;
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

const Cell: React.FC<Props> = ({ value, ...props }) => {
    const color = value > 0 ? COLORS[value as Range<1, 9>] : "";

    return (
        <td style={{ color }} {...props}>
            {value === -1 && <img src={bomb} alt="bomb" />}
            {value > 0 && value}
        </td>
    );
};

export default Cell;
