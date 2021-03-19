import React, { useCallback, useState } from "react";
import { array2d } from "./util/array";
import {
    addBombs,
    calculateValues,
    clearClick,
    openSurrounding,
} from "./util/board";
import { notNull, pipe } from "./util/functions";
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

    const open = (actions: Action[]) => (
        x: number,
        y: number
    ): Action | null => {
        const sameSquare = actions.find(
            (action) => action.x === x && action.y === y
        );

        if (!sameSquare || sameSquare.type !== ActionType.OPEN) {
            return { x, y, type: ActionType.OPEN };
        } else {
            return null;
        }
    };

    const handleClick = (clickX: number, clickY: number) => () => {
        const newActions: Array<Action | null> = [];

        const click = () => newActions.push(open(actions)(clickX, clickY));

        match(gameState)
            .on(GameState.NOT_STARTED, () => {
                setBoard(clearClick(board)(clickX, clickY));
                click();
                setGameState(GameState.STARTED);
            })
            .on(GameState.STARTED, () => {
                click();
            });

        const filteredNewActions = newActions.filter(notNull);
        setActions([...actions, ...filteredNewActions]);
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
