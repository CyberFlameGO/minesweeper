import React, { useCallback, useEffect } from "react";
import { addIfNotNull, array2d } from "./util/array";
import {
    addBombsPercent,
    calculateValues,
    createClearClick,
    openFactory,
    isBomb,
} from "./util/board";
import { className, either, preventDefault } from "./util/functions";
import "./Minesweeper.scss";
import Cell from "./Cell";
import match from "./util/functions/match";
import Borders from "./Borders";
import { useStoredState } from "./util/useStoredState";
import { pipe } from "./util/functions/pipe";
import {
    Action,
    actionFactory,
    ActionType,
    allBombsFlagged,
    createIsActionType,
    createRemoveAction,
    getLastAction,
} from "./util/action";

enum State {
    NOT_STARTED,
    STARTED,
    WON,
    LOST,
}

const Minesweeper: React.FC<{}> = () => {
    const [width] = useStoredState("width", 16);
    const [height] = useStoredState("heigth", 16);
    const [mines] = useStoredState("mines", 15);

    console.log("Minesweeper.tsx", width, height);

    const [board, setBoard, clearStoredBoard] = useStoredState("board", () =>
        pipe(addBombsPercent(mines), calculateValues)(array2d(width)(height)(0))
    );

    const [actions, setActions, clearStoredActions] = useStoredState<Action[]>(
        "actions",
        []
    );

    const [state, setState, clearStoredState] = useStoredState(
        "state",
        State.NOT_STARTED
    );

    const [, , clearStoredLocation] = useStoredState("location", "/");

    const clearStorage = useCallback(() => {
        clearStoredBoard();
        clearStoredActions();
        clearStoredState();
        clearStoredLocation();
    }, [
        clearStoredActions,
        clearStoredBoard,
        clearStoredState,
        clearStoredLocation,
    ]);

    useEffect(() => {
        match(state).on(either<State>(State.LOST, State.WON), clearStorage);
    }, [state, clearStorage]);

    useEffect(() => {
        if (allBombsFlagged(board, actions)) setState(State.WON);
    }, [actions, board, setState]);

    const is = createIsActionType(actions);
    const isFlagged = is(ActionType.FLAG);
    const isOpen = is(ActionType.OPEN);

    const createLeftClickHandler = (x: number, y: number) => () => {
        const newActions: Array<Action> = [];
        const open = openFactory(board, actions);

        match(state)
            .on(State.NOT_STARTED, () => {
                setBoard(createClearClick(board, 1)(x, y));
                setState(State.STARTED);
            })
            .on(either<State>(State.STARTED, State.NOT_STARTED), () => {
                if (!isFlagged(x, y)) {
                    newActions.push(...open(x, y));

                    if (isBomb(x, y)(board)) {
                        setState(State.LOST);
                    }
                }
            });

        const dontOpenFlagged = ({ x, y, type }: Action) =>
            type === ActionType.OPEN && !isFlagged(x, y);

        setActions([...actions, ...newActions.filter(dontOpenFlagged)]);
    };

    const createRightClickHandler = (x: number, y: number) => () => {
        const createFlagAction = actionFactory(actions, ActionType.FLAG);

        match(state)
            .on(State.NOT_STARTED, () => {
                const leftClick = createLeftClickHandler(x, y);
                leftClick();
            })
            .on(State.STARTED, () => {
                if (isFlagged(x, y)) {
                    const removeFlag = createRemoveAction(ActionType.FLAG);
                    setActions(removeFlag(actions, x, y));
                } else if (!isOpen(x, y)) {
                    setActions(
                        addIfNotNull(actions, createFlagAction({ x, y }))
                    );
                }
            });
    };

    const lastOpen = getLastAction(actions, ActionType.OPEN);

    return (
        <Borders>
            <table
                id="Minesweeper"
                onContextMenu={preventDefault}
                className={className({ lost: state === State.LOST })}
            >
                <tbody>
                    {board.map((row, y) => (
                        <tr key={y}>
                            {row.map((value, x) => {
                                const bomb = value === -1;
                                const lost = state === State.LOST;
                                const wasLastOpen =
                                    lastOpen &&
                                    lastOpen.y === y &&
                                    lastOpen.x === x;

                                return (
                                    <Cell
                                        value={value}
                                        open={isOpen(x, y)}
                                        red={bomb && lost && wasLastOpen}
                                        flagged={isFlagged(x, y)}
                                        lost={lost}
                                        onLeftClick={createLeftClickHandler(
                                            x,
                                            y
                                        )}
                                        onRightClick={createRightClickHandler(
                                            x,
                                            y
                                        )}
                                        key={x}
                                    />
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </Borders>
    );
};

export default Minesweeper;
