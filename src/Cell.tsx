import React from "react";

interface Props {
    value: number;
    [key: string]: any;
}

const Cell: React.FC<Props> = ({ value, ...props }) => {
    // Temporary
    return <td {...props}>{value === -1 ? "X" : value === 0 ? "" : value}</td>;
};

export default Cell;
