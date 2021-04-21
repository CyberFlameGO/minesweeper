import React from "react";

const Table: React.FC = ({ children, ...props }) => {
    return (
        <table {...props}>
            <tbody>{children}</tbody>
        </table>
    );
};

export default Table;
