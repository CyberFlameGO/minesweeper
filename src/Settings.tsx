import React from "react";
import { useHistory } from "react-router-dom";
import Button from "./components/Button";
import "./Settings.scss";
import { call } from "./util/functions";

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
    const history = useHistory();

    return (
        <div className="Settings">
            <div className="close" onClick={call(history.goBack)}></div>

            <h1>Difficulty</h1>

            <div className="buttons">
                <Button>Beginner</Button>
                <Button>Intermediate</Button>
                <Button>Expert</Button>
                <Button>Custom</Button>
            </div>
        </div>
    );
};

export default Settings;
