import React from "react";

interface TableProps {
    [key: string]: any;
}

const Table: React.FC<TableProps> = ({ children, ...props }) => {
    return (
        <table {...props}>
            <tbody>{children}</tbody>
        </table>
    );
};

export default Table;
