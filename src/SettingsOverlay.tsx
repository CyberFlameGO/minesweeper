import React, { useState } from "react";
import settings from "./assets/settings-white.svg";

import "./SettingsOverlay.scss";
import { className } from "./util/functions";

interface SettingsOverlayProps {}

const SettingsOverlay: React.FC<SettingsOverlayProps> = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className={className({ overlay: true, open })}>
                <div className="ribbon" onClick={() => setOpen((x) => !x)}>
                    <img src={settings} alt="settings" />
                </div>
            </div>
        </>
    );
};

export default SettingsOverlay;
