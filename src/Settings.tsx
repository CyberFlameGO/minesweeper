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

enum BoardSize {
    Small = "small",
    Medium = "medium",
    Large = "large",
    Custom = "custom",
}

const BOARD_SIZES = [
    { name: BoardSize.Small, width: 9, height: 9 },
    { name: BoardSize.Medium, width: 16, height: 16 },
    { name: BoardSize.Large, width: 25, height: 19 },
];

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

const handleChange = (setValue: SetState<any>, process = (x: any) => x) => (
    event: React.ChangeEvent<any>
) => setValue(process(event.target.value));

const createSizeInput = (
    value: number,
    setValue: SetState<number>,
    max: number = 30
) => (
    <input
        type="number"
        min={1}
        max={max}
        autoComplete="off"
        value={value}
        onChange={handleChange(setValue, Number)}
    />
);

const Settings: React.FC = () => {
    const history = useHistory();

    const [difficulty, setDifficulty] = useStoredState(
        "difficulty",
        Difficulty.Intermediate
    );
    const [size, setSize] = useStoredState("size", BoardSize.Medium);

    const selectDifficulty = (i: Difficulty) => () => setDifficulty(i);
    const selectSize = (s: BoardSize) => () => setSize(s);

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

            <div className="buttons">
                {BOARD_SIZES.map(({ name }) => (
                    <Button
                        className={className({ selected: size === name })}
                        onClick={selectSize(name)}
                        key={name}
                    >
                        {name}
                    </Button>
                ))}
                <Button
                    className={className({
                        selected: size === BoardSize.Custom,
                    })}
                    onClick={selectSize(BoardSize.Custom)}
                >
                    Custom
                </Button>
            </div>

            {size === BoardSize.Custom && (
                <div className="container">
                    <div className="col">
                        <p>Width</p>
                        {createSizeInput(width, setWidth, 25)}
                    </div>
                    <div className="col">
                        <p>Height</p>
                        {createSizeInput(height, setHeight, 19)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;
