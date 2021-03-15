import React from "react";
import "./Borders.scss";

const Borders: React.FC = ({ children }) => {
    return (
        <div className="Borders">
            <div className="content">{children}</div>
            <p className="bottom">
                Minesweeper font provided by{" "}
                <a href="https://fontstruct.com/fontstructors/593973/gezoda">
                    Gezoda
                </a>{" "}
                on fontstruct.com.
            </p>
        </div>
    );
};

export default Borders;
