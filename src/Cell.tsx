import React from "react";

interface Props {
    value: number;
    [key: string]: any;
}

const Cell: React.FC<Props> = ({ value, ...props }) => {
    return <td {...props}>{value}</td>;
};

export default Cell;
