import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Minesweeper from "./Minesweeper";
import PlayOverlay from "./PlayOverlay";
import "./App.scss";

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path="/game">
                    <Minesweeper />
                </Route>
                <Route path="/">
                    <PlayOverlay />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
