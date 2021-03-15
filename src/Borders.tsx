import React from "react";
import "./Borders.scss";

const Borders: React.FC = ({ children }) => {
    return (
        <div className="Borders">
            <div className="content">{children}</div>
        </div>
    );
};

export default Borders;
