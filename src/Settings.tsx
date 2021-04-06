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

const handleChange = (setValue: SetState<any>, process = (x: any) => x) => (
    event: React.ChangeEvent<any>
) => setValue(process(event.target.value));

const createSizeInput = (
    value: number,
    setValue: SetState<number>,
    max = 30
) => (
    <input
        type="number"
        min={1}
        max={30}
        autoComplete="off"
        value={value}
        onChange={handleChange(setValue, Number)}
    />
);

const Settings: React.FC = () => {
    const history = useHistory();

    const [difficulty, setDifficulty] = useStoredState("difficulty", 0);

    const selectDifficulty = (i: number) => () => setDifficulty(i);

    const difficulties = ["Beginner", "Intermediate", "Expert", "Custom"];

    const [width, setWidth] = useStoredState("width", 16);
    const [height, setHeight] = useStoredState("heigth", 16);
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
                <div className="container">
                    <input
                        type="range"
                        min={1}
                        max={99}
                        value={mines}
                        onChange={handleChange(setMines, Number)}
                    />

                    <p>{mines}% mines</p>
                </div>
            )}

            <h1>Size</h1>

            <div className="container m0">
                <div className="col">
                    <p>Width</p>
                    {createSizeInput(width, setWidth, 25)}
                </div>
                <div className="col">
                    <p>Height</p>
                    {createSizeInput(height, setHeight, 19)}
                </div>
            </div>
        </div>
    );
};

export default Settings;
