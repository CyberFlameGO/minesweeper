import React, { useState, useCallback } from "react";
import "./overlay.scss";
import "./PlayOverlay.scss";
import { className } from "./util/functions";

interface PlayOverlayProps {
    show: boolean;
}

const PlayOverlay: React.FC<PlayOverlayProps> = ({ show: _show }) => {
    const [show, setShow] = useState(_show);

    const hide = useCallback(() => setShow(false), [setShow]);

    return (
        <div className={className({ show }, "overlay", "play")}>
            <h1>Minesweeper</h1>
            <button onMouseUp={hide}>Play</button>

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

export default PlayOverlay;
