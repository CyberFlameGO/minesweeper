import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
    useHistory,
} from "react-router-dom";
import Minesweeper from "./Minesweeper";
import MainMenu from "./MainMenu";
import Settings from "./Settings";
import { useStoredState } from "./util/useStoredState";

const StoreLocation: React.FC = () => {
    const [storedLocation, setStoredLocation] = useStoredState("location", "/");

    const location = useLocation();
    const history = useHistory();

    const onMount = () => history.push(storedLocation);

    useEffect(() => setStoredLocation(location.pathname), [
        location,
        setStoredLocation,
    ]);

    useEffect(onMount, []); // eslint-disable-line react-hooks/exhaustive-deps

    return <></>;
};

const App: React.FC = () => {
    return (
        <Router>
            <StoreLocation />

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
