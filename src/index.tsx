import React from "react";
import ReactDOM from "react-dom";
import Minesweeper from "./Minesweeper";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";

ReactDOM.render(
    <React.StrictMode>
        <Minesweeper />
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
