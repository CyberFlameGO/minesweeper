import React from "react";
import { useHistory } from "react-router-dom";
import Button from "./components/Button";
import "./Settings.scss";
import { call, className } from "./util/functions";
import { useStoredState } from "./util/useStoredState";

enum Difficulty {
    Beginner = 0,
    Intermediate = 1,
    Expert = 2,
    Custom = 3,
}

const Settings: React.FC = () => {
    const history = useHistory();

    const [difficulty, setDifficulty] = useStoredState("difficulty", 0);

    const selectDifficulty = (i: number) => () => setDifficulty(i);

    const difficulties = ["Beginner", "Intermediate", "Expert", "Custom"];

    return (
        <div className="Settings">
            <div className="close" onClick={call(history.push, "/")}></div>

            <h1>Difficulty</h1>

            <div className="buttons">
                {difficulties.map((name, i) => (
                    <Button
                        className={className({ selected: difficulty === i })}
                        onClick={selectDifficulty(i)}
                        key={i}
                    >
                        {name}
                    </Button>
                ))}
            </div>

            {difficulty === Difficulty.Custom && (
                <div className="custom-options">
                    <p>Custom options:</p>

                    <table>
                        <tr>
                            <td>Width</td>
                            <td>Height</td>
                            <td>Mines (%)</td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    type="number"
                                    name="width"
                                    autoComplete={"off"}
                                    min={2}
                                    max={30}
                                    value={15}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="height"
                                    autoComplete={"off"}
                                    min={2}
                                    max={30}
                                    value={15}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="mines"
                                    autoComplete={"off"}
                                    min={1}
                                    max={100}
                                    value={20}
                                />
                            </td>
                        </tr>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Settings;
