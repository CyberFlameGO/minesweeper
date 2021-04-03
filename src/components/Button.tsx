import React from "react";
import "./Button.scss";

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
    children,
    ...props
}) => {
    return (
        <button {...props} className={`Button ${props.className}`}>
            <div className="inner">{children}</div>
        </button>
    );
};

export default Button;
