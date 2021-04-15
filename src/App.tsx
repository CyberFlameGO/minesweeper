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
import { getStoredState } from "./util/storedState";

// Own component to be able to use the useHistory hook
const SetLocation = () => {
    const history = useHistory();
    const gameState = getStoredState("state", null);

    if (gameState !== null) {
        history.push("/game");
    } else {
        history.push("/");
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
