import React, { useCallback, useState } from "react";
import { array2d } from "./util/array";
import { addBombs, calculateValues, clearClick } from "./util/board";
import { pipe } from "./util/functions";
import "./Minesweeper.scss";
import Cell from "./Cell";
import match from "./util/functions/match";

enum GameState {
    NOT_STARTED,
    STARTED,
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

const Minesweeper: React.FC<{}> = () => {
    const [board, setBoard] = useState(() =>
        pipe(array2d(16)(16)(0), addBombs(20), calculateValues)
    );

    const [actions, setActions] = useState<Action[]>([]);
    const [gameState, setGameState] = useState(GameState.NOT_STARTED);

    const pushAction = useCallback(
        (action: Action) => {
            const sameSquare = actions.find(
                ({ x, y }) => x === action.x && y === action.y
            );

            if (!sameSquare || sameSquare.type !== action.type) {
                const updated = actions.slice();
                updated.push(action);

                setActions(updated.filter((it) => it !== sameSquare));
            }
        },
        [actions, setActions]
    );

    const handleClick = (clickX: number, clickY: number) => () => {
        const click = () =>
            pushAction({ type: ActionType.OPEN, x: clickX, y: clickY });

        match(gameState)
            .on(GameState.NOT_STARTED, () => {
                setBoard(clearClick(board)(clickX, clickY));
                click();
                setGameState(GameState.STARTED);
            })
            .on(GameState.STARTED, () => {
                click();
            });
    };

    const opened = (actions: Action[]) => (x: number, y: number): boolean =>
        !!actions.find((it) => it.x === x && it.y === y);

    return (
        <table id="Minesweeper">
            <tbody>
                {board.map((row, y) => (
                    <tr key={y}>
                        {row.map((value, x) => (
                            <Cell
                                value={value}
                                open={opened(actions)(x, y)}
                                onClick={handleClick(x, y)}
                                key={x}
                            />
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Minesweeper;
