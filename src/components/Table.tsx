import React from "react";

const Table: React.FC<React.TableHTMLAttributes<HTMLTableElement>> = ({
    children,
    ...props
}) => {
    return (
        <table {...props}>
            <tbody>{children}</tbody>
        </table>
    );
};

export default Table;
