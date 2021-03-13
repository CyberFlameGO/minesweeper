import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import {
    ICell,
    setupBoard,
    openSurroundingZeros,
    baseBoard,
    isWin,
} from "./util/board";

const State = {
    NOT_STARTED: -2,
    LOSS: -1,
    PLAYING: 0,
    WIN: 1,
};

const WIDTH = 16;
const HEIGHT = 16;

const Minesweeper: React.FC = () => {
    const [width, setWidth] = useState(16);
    const [height, setHeight] = useState(16);
    const [mines, setMines] = useState(64);

    const [gameState, setGameState] = useState<number>(State.NOT_STARTED);
    const [board, setBoard] = useState(() => baseBoard(WIDTH, HEIGHT));

    useEffect(() => {
        if (gameState === State.NOT_STARTED) {
            setBoard(baseBoard(width, height));
        }
    }, [width, height, gameState]);

    const handleClick = (x: number, y: number, cell: ICell) => (
        event: React.MouseEvent
    ) => {
        const leftClick = event.button === 0;
        const rightClick = event.button === 2;

        if (gameState === State.NOT_STARTED) {
            if (leftClick) {
                const newBoard = setupBoard({
                    width,
                    height,
                    mines,
                    click: { x, y },
                });

                openSurroundingZeros(x, y, newBoard);

                setBoard(newBoard);
                setGameState(State.PLAYING);
            }
        }

        if (gameState !== State.PLAYING) return;

        const newBoard = board.slice();

        if (leftClick && !cell.flagged) {
            cell.open = true;

            if (cell.value === 0) {
                openSurroundingZeros(x, y, board);
            } else if (cell.value === -1) {
                board.forEach((row) =>
                    row.forEach((cell) => {
                        if (cell.value === -1) {
                            cell.open = true;
                        }
                    })
                );

                setGameState(State.LOSS);
            }
        } else if (rightClick) {
            cell.flagged = !cell.flagged;
        }

        if (isWin(newBoard)) {
            setGameState(State.WIN);
        }

        setBoard(newBoard);
    };

    return (
        <>
            <div
                className="board"
                onContextMenu={(event) => event.preventDefault()}
            >
                {board.map((row, y) => (
                    <div className="row" key={y}>
                        {row.map((cell, x) => (
                            <Cell
                                cell={cell}
                                key={x}
                                onClick={handleClick(x, y, cell)}
                            />
                        ))}
                    </div>
                ))}
            </div>

            <label>
                Width
                <input
                    type="range"
                    min={1}
                    max={32}
                    value={width}
                    onInput={({ target }) =>
                        setWidth(Number((target as HTMLInputElement).value))
                    }
                />
            </label>
            <label>
                Height
                <input
                    type="range"
                    min={1}
                    max={32}
                    value={height}
                    onInput={({ target }) =>
                        setHeight(Number((target as HTMLInputElement).value))
                    }
                />
            </label>

            <label>
                Mines
                <input
                    type="number"
                    min={1}
                    max={500}
                    value={mines}
                    onInput={({ target }) =>
                        setMines(Number((target as HTMLInputElement).value))
                    }
                />
            </label>

            {gameState === State.WIN && <h1>You won!</h1>}
            {gameState === State.LOSS && <h1>You lost!</h1>}
        </>
    );
};

export default Minesweeper;
