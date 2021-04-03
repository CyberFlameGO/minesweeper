import React, { useCallback, useEffect, useMemo } from "react";
import { addIfNotNull, array2d } from "./util/array";
import {
    addBombsPercent,
    calculateValues,
    createClearClick,
    createOpenNeighbours,
    isBomb,
} from "./util/board";
import { className, either, notNull, preventDefault } from "./util/functions";
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
    createIsActionType,
    createRemoveAction,
    getLastAction,
} from "./util/Action";

enum State {
    NOT_STARTED,
    STARTED,
    WON,
    LOST,
}

const createClick = (board: number[][], actions: Action[]) => (
    x: number,
    y: number
): Action[] => {
    const openNeighbours = createOpenNeighbours(board);
    const createOpenAction = actionFactory(actions, ActionType.OPEN);

    return [
        ...[createOpenAction({ x, y })].filter(notNull),
        ...(board[y][x] === 0
            ? openNeighbours(x, y).map(createOpenAction).filter(notNull)
            : []),
    ];
};

const Minesweeper: React.FC<{}> = () => {
    const [board, setBoard, clearStoredBoard] = useStoredState("board", () =>
        pipe(addBombsPercent(20), calculateValues)(array2d(14)(14)(0))
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

    const is = useMemo(() => createIsActionType(actions), [actions]);
    const isFlagged = is(ActionType.FLAG);
    const isOpen = is(ActionType.OPEN);

    useEffect(() => {
        const allBombsFlagged = board.every((row, y) =>
            row.every(
                (value, x) =>
                    (value === -1 && isFlagged(x, y)) ||
                    (value > -1 && isOpen(x, y))
            )
        );

        if (allBombsFlagged) setState(State.WON);
    }, [actions, board, isFlagged, isOpen, setState]);

    const createLeftClickHandler = (x: number, y: number) => () => {
        const newActions: Array<Action> = [];
        const click = createClick(board, actions);

        match(state)
            .on(State.NOT_STARTED, () => {
                setBoard(createClearClick(board, 1)(x, y));
                setState(State.STARTED);
            })
            .on(either<State>(State.STARTED, State.NOT_STARTED), () => {
                if (!isFlagged(x, y)) {
                    newActions.push(...click(x, y));

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

                                const flagged = isFlagged(x, y);
                                const open = isOpen(x, y);

                                return (
                                    <Cell
                                        value={value}
                                        open={open}
                                        red={bomb && lost && wasLastOpen}
                                        flagged={flagged}
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
