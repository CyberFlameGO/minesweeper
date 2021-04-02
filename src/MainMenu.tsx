import React from "react";
import { Link } from "react-router-dom";
import "./PlayOverlay.scss";

interface MainMenuProps {}

const MainMenu: React.FC<MainMenuProps> = () => {
    return (
        <div className="MainMenu">
            <h1>Minesweeper</h1>

            <div className="buttons">
                <Link to="/game">
                    <button className="play">Play</button>
                </Link>

                <Link to="/settings">
                    <button className="settings">Settings</button>
                </Link>
            </div>

            <p className="attribution">
                Minesweeper font provided by Gangetsha Lyx at{" "}
                <a
                    href="https://fontstruct.com/fontstructions/show/1501665/mine-sweeper"
                    target="_blank"
                    rel="noreferrer"
                >
                    fontconstruct.com
                </a>
            </p>
        </div>
    );
};

export default MainMenu;
