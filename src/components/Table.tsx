import React from "react";

const Table: React.FC = ({ children }) => {
    return (
        <table>
            <tbody>{children}</tbody>
        </table>
    );
};

export default Table;
