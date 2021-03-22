import React, { useCallback, useEffect } from "react";
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
} from "./util/functions";
import "./Minesweeper.scss";
import Cell from "./Cell";
import match from "./util/functions/match";
import Borders from "./Borders";
import { useStoredState } from "./util/useStoredState";

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

const actionEquals = (action1: Action) => (action2: Action) =>
    action1.type === action2.type &&
    action1.x === action2.x &&
    action1.y === action2.y;

const actionNotEquals = (action1: Action) => (action2: Action) =>
    !actionEquals(action1)(action2);

const getLast = (actions: Action[], actionType: ActionType) =>
    actions.filter(({ type }) => type === actionType).slice(-1)[0];

const uniqueAction = (actions: Action[], action: Action) =>
    !actions.find(actionEquals(action));

const createActionFactory = (actions: Action[], type: ActionType) => ({
    x,
    y,
}: Coordinates): Action | null => {
    const action = { x, y, type };

    return uniqueAction(actions, action) ? action : null;
};

const createIsType = (actions: Action[]) => (type: ActionType) => (
    x: number,
    y: number
): boolean => !uniqueAction(actions, { x, y, type });

const createRemove = (type: ActionType) => (
    actions: Action[],
    x: number,
    y: number
) => actions.filter(actionNotEquals({ x, y, type }));

const createClick = (board: number[][], actions: Action[]) => (
    x: number,
    y: number
): Action[] => {
    const openNeighbours = createOpenNeighbours(board);
    const createOpenAction = createActionFactory(actions, ActionType.OPEN);

    return [
        ...[createOpenAction({ x, y })].filter(notNull),
        ...(board[y][x] === 0
            ? openNeighbours(x, y).map(createOpenAction).filter(notNull)
            : []),
    ];
};

const Minesweeper: React.FC<{}> = () => {
    const [board, setBoard, clearBoardStorage] = useStoredState<number[][]>(
        "board",
        () => pipe(array2d(14)(14)(0), addBombs(20), calculateValues)
    );

    const [actions, setActions, clearActionsStorage] = useStoredState<Action[]>(
        "actions",
        []
    );

    const [
        gameState,
        setGameState,
        clearGameStateStorage,
    ] = useStoredState<State>("state", State.NOT_STARTED);

    const clearStorage = useCallback(() => {
        clearBoardStorage();
        clearActionsStorage();
        clearGameStateStorage();
    }, [clearActionsStorage, clearBoardStorage, clearGameStateStorage]);

    useEffect(() => {
        match(gameState).on(either<State>(State.LOST, State.WON), clearStorage);
    }, [gameState, clearStorage]);

    const is = createIsType(actions);
    const isFlagged = is(ActionType.FLAG);
    const isOpen = is(ActionType.OPEN);

    const createLeftClickHandler = (x: number, y: number) => () => {
        const newActions: Array<Action> = [];
        const click = createClick(board, actions);

        match(gameState)
            .on(State.NOT_STARTED, () => {
                setBoard(createClearClick(board)(x, y));
                setGameState(State.STARTED);
            })
            .on(either<State>(State.STARTED, State.NOT_STARTED), () => {
                if (!isFlagged(x, y)) {
                    newActions.push(...click(x, y));

                    if (isBomb(x, y)(board)) {
                        setGameState(State.LOST);
                    }
                }
            });

        const dontOpenFlagged = ({ x, y, type }: Action) =>
            type === ActionType.OPEN && !isFlagged(x, y);

        setActions([...actions, ...newActions.filter(dontOpenFlagged)]);
    };

    const createRightClickHandler = (x: number, y: number) => () => {
        const createFlagAction = createActionFactory(actions, ActionType.FLAG);

        match(gameState)
            .on(State.NOT_STARTED, () => {
                const leftClick = createLeftClickHandler(x, y);
                leftClick();
            })
            .on(State.STARTED, () => {
                if (isFlagged(x, y)) {
                    const removeFlag = createRemove(ActionType.FLAG);
                    setActions(removeFlag(actions, x, y));
                } else if (!isOpen(x, y)) {
                    setActions(
                        addIfNotNull(actions, createFlagAction({ x, y }))
                    );
                }
            });
    };

    const lastOpen = getLast(actions, ActionType.OPEN);

    return (
        <Borders>
            <table
                id="Minesweeper"
                onContextMenu={preventDefault}
                className={className({ lost: gameState === State.LOST })}
            >
                <tbody>
                    {board.map((row, y) => (
                        <tr key={y}>
                            {row.map((value, x) => {
                                const bomb = value === -1;
                                const lost = gameState === State.LOST;
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
