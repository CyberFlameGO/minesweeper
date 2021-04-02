import React from "react";
import { useHistory } from "react-router-dom";
import "./Settings.scss";
import { call } from "./util/functions";

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
    const history = useHistory();

    return (
        <div className="Settings">
            <div className="close" onClick={call(history.goBack)}></div>
        </div>
    );
};

export default Settings;
