import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
} from "react-router-dom";
import Minesweeper from "./Minesweeper";
import MainMenu from "./MainMenu";
import Settings from "./Settings";
import { getStoredState } from "./util/useStoredState";

const SetLocation = () => {
    const history = useHistory();
    const gameState = getStoredState("state");

    if (gameState !== null) {
        history.push("/game");
    }

    return <></>;
};

const App: React.FC = () => {
    return (
        <Router>
            <SetLocation />
            <Switch>
                <Route path="/game">
                    <Minesweeper />
                </Route>
                <Route path="/settings">
                    <Settings />
                </Route>
                <Route exact path="/">
                    <MainMenu />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
