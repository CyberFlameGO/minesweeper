import React, { useState } from "react";
import { array2d } from "./util/array";

const Minesweeper: React.FC<{}> = () => {
    const [board] = useState(() => array2d(16)(16)(0));

    return <div className="Minesweeper"></div>;
};

export default Minesweeper;
