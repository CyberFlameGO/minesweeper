import React from "react";
import bomb from "./assets/bomb.png";

interface Props {
    value: number;
    [key: string]: any;
}

const Cell: React.FC<Props> = ({ value, ...props }) => {
    return (
        <td {...props}>
            {value === -1 && <img src={bomb} alt="bomb" />}
            {value > 0 && value}
        </td>
    );
};

export default Cell;
