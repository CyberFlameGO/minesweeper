import React, { useState } from "react";
import { addIfNotNull, array2d } from "./util/array";
import {
    addBombs,
    calculateValues,
    createClearClick,
    Coordinates,
    createOpenNeighbours,
    isBomb,
} from "./util/board";
import {
    className,
    either,
    notNull,
    pipe,
    preventDefault,
    unique,
} from "./util/functions";
import "./Minesweeper.scss";
import Cell from "./Cell";
import match from "./util/functions/match";

enum State {
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

const createActionFactory = (actions: Action[], type: ActionType) => ({
    x,
    y,
}: Coordinates): Action | null => {
    const action = { x, y, type };

    return uniqueAction(actions, action) ? action : null;
};

const createIsType = (actions: Action[]) => (
    x: number,
    y: number,
    type: ActionType
): boolean => !unique(actions, ["x", "y", "type"])({ x, y, type });

const createClick = (board: number[][], actions: Action[]) => (
    x: number,
    y: number
) => {
    const openNeighbours = createOpenNeighbours(board);
    const createOpenAction = createActionFactory(actions, ActionType.OPEN);

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
    const [gameState, setGameState] = useState(State.NOT_STARTED);

    const createLeftClickHandler = (x: number, y: number) => () => {
        const newActions: Array<Action | null> = [];
        const click = createClick(board, actions);

        match(gameState)
            .on(State.NOT_STARTED, () => {
                setBoard(createClearClick(board)(x, y));
                setGameState(State.STARTED);
            })
            .on(either<State>(State.STARTED, State.NOT_STARTED), () => {
                newActions.push(...click(x, y));

                if (isBomb(x, y)(board)) {
                    setGameState(State.LOST);
                }
            });

        setActions([...actions, ...newActions.filter(notNull)]);
    };

    const createRightClickHandler = (x: number, y: number) => () => {
        const createFlagAction = createActionFactory(actions, ActionType.FLAG);

        match(gameState).on(
            either<State>(State.NOT_STARTED, State.STARTED),
            () => {
                setActions(addIfNotNull(actions, createFlagAction({ x, y })));
            }
        );
    };

    const is = createIsType(actions);
    const lastOpen = getLastOpen(actions);

    return (
        <table
            id="Minesweeper"
            onContextMenu={preventDefault}
            className={className({ lost: gameState === State.LOST })}
        >
            <tbody>
                {board.map((row, y) => (
                    <tr key={y}>
                        {row.map((value, x) => {
                            const open = is(x, y, ActionType.OPEN);
                            const flagged = is(x, y, ActionType.FLAG);
                            const bomb = value === -1;
                            const lost = gameState === State.LOST;
                            const wasLastOpen =
                                lastOpen &&
                                lastOpen.y === y &&
                                lastOpen.x === x;

                            return (
                                <Cell
                                    value={value}
                                    open={open || (bomb && lost)}
                                    red={bomb && lost && wasLastOpen}
                                    flagged={flagged}
                                    onLeftClick={createLeftClickHandler(x, y)}
                                    onRightClick={createRightClickHandler(x, y)}
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
