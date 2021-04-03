import React from "react";
import "./Button.scss";

const Button: React.FC = ({ children }) => {
    return (
        <button className="Button">
            <div className="inner">{children}</div>
        </button>
    );
};

export default Button;
