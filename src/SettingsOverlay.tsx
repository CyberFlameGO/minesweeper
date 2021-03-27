import React from "react";
import settings from "./assets/settings-white.svg";

import "./SettingsOverlay.scss";

interface SettingsOverlayProps {}

const SettingsOverlay: React.FC<SettingsOverlayProps> = () => {
    return (
        <>
            <div className="ribbon">
                <img src={settings} alt="settings" />
            </div>
        </>
    );
};

export default SettingsOverlay;
