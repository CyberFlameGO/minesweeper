import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Minesweeper from "./Minesweeper";
import MainMenu from "./MainMenu";
import Settings from "./Settings";
import "./App.scss";

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path="/game">
                    <Minesweeper />
                </Route>
                <Route path="/settings">
                    <Settings />
                </Route>
                <Route path="/">
                    <MainMenu />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
