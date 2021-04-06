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

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

const handleChange = (setValue: SetState<any>) => (
    event: React.ChangeEvent<any>
) => setValue(event.target.value);

const NumberInput = (
    name: string,
    min: number,
    max: number,
    value: number,
    setValue: SetState<number>
) => (
    <input
        type="number"
        onChange={handleChange(setValue)}
        {...{ min, max, name, value }}
    />
);

const Settings: React.FC = () => {
    const history = useHistory();

    const [difficulty, setDifficulty] = useStoredState("difficulty", 0);

    const selectDifficulty = (i: number) => () => setDifficulty(i);

    const difficulties = ["Beginner", "Intermediate", "Expert", "Custom"];

    const [width, setWidth] = useStoredState("width", 15);
    const [height, setHeight] = useStoredState("height", 15);
    const [mines, setMines] = useStoredState("mines", 20);

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
                        <tbody>
                            <tr>
                                <td>Width</td>
                                <td>Height</td>
                                <td>Mines (%)</td>
                            </tr>
                            <tr>
                                <td>
                                    {NumberInput(
                                        "width",
                                        2,
                                        30,
                                        width,
                                        setWidth
                                    )}
                                </td>
                                <td>
                                    {NumberInput(
                                        "height",
                                        2,
                                        30,
                                        height,
                                        setHeight
                                    )}
                                </td>
                                <td>
                                    {NumberInput(
                                        "mines",
                                        1,
                                        100,
                                        mines,
                                        setMines
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Settings;
