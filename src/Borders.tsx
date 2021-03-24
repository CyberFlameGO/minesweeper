import React from "react";
import "./Borders.scss";
import settings from "./assets/settings-white.svg";

const Borders: React.FC = ({ children }) => {
    return (
        <div className="Borders">
            <div className="ribbon">
                <img src={settings} alt="settings" />
            </div>
            <div className="content">{children}</div>
        </div>
    );
};

export default Borders;
