import React, { useState } from "react";
import { array2d } from "./util/array";
import {
    addBombs,
    calculateValues,
    createClearClick,
    Coordinates,
    createOpenNeighbours,
} from "./util/board";
import { className, notNull, pipe, unique } from "./util/functions";
import "./Minesweeper.scss";
import Cell from "./Cell";
import match from "./util/functions/match";

enum GameState {
    NOT_STARTED,
    STARTED,
    WON,
    LOST,
}

enum ActionType {
    FLAG,
    OPEN,
}

interface Action {
    type: ActionType;
    x: number;
    y: number;
}

const isOpen = (action: Action) => action.type === ActionType.OPEN;
const getOpened = (actions: Action[]) => actions.filter(isOpen);
const getLastOpen = (actions: Action[]) => getOpened(actions).slice(-1)[0];

const uniqueAction = (actions: Action[], action: Action) =>
    unique(actions, ["x", "y", "type"])(action);

const createOpenActionFactory = (actions: Action[]) => ({
    x,
    y,
}: Coordinates): Action | null => {
    const action = { x, y, type: ActionType.OPEN };

    return uniqueAction(actions, action) ? action : null;
};

const createIsOpened = (actions: Action[]) => (x: number, y: number): boolean =>
    !unique(actions, ["x", "y", "type"])({ x, y, type: ActionType.OPEN });

const createClick = (board: number[][], actions: Action[]) => (
    x: number,
    y: number
) => {
    const openNeighbours = createOpenNeighbours(board);
    const createOpenAction = createOpenActionFactory(actions);

    return [
        createOpenAction({ x, y }),
        ...(board[y][x] === 0
            ? openNeighbours(x, y).map(createOpenAction)
            : []),
    ];
};

const Minesweeper: React.FC<{}> = () => {
    const [board, setBoard] = useState(() =>
        pipe(array2d(16)(16)(0), addBombs(20), calculateValues)
    );

    const [actions, setActions] = useState<Action[]>([]);
    const [gameState, setGameState] = useState(GameState.NOT_STARTED);

    const createClickHandler = (x: number, y: number) => () => {
        const newActions: Array<Action | null> = [];

        const click = createClick(board, actions);

        match(gameState)
            .on(GameState.NOT_STARTED, () => {
                setBoard(createClearClick(board)(x, y));
                setGameState(GameState.STARTED);
            })
            .on(
                (state) =>
                    state === GameState.STARTED ||
                    state === GameState.NOT_STARTED,
                () => {
                    newActions.push(...click(x, y));

                    if (board[y][x] === -1) {
                        setGameState(GameState.LOST);
                    }
                }
            );

        setActions([...actions, ...newActions.filter(notNull)]);
    };

    const isOpened = createIsOpened(actions);
    const lastOpen = getLastOpen(actions);

    return (
        <table
            id="Minesweeper"
            className={className({ lost: gameState === GameState.LOST })}
        >
            <tbody>
                {board.map((row, y) => (
                    <tr key={y}>
                        {row.map((value, x) => {
                            const open = isOpened(x, y);
                            const bomb = value === -1;
                            const lost = gameState === GameState.LOST;
                            const wasLastOpen =
                                lastOpen &&
                                lastOpen.y === y &&
                                lastOpen.x === x;

                            return (
                                <Cell
                                    value={value}
                                    open={open || (bomb && lost)}
                                    red={bomb && lost && wasLastOpen}
                                    onClick={createClickHandler(x, y)}
                                    key={x}
                                />
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Minesweeper;
