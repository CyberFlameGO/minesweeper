import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import { createHandleClickFactory } from "./createHandleClickFactory";
import { baseBoard } from "./util/board";

export enum GameState {
    NOT_STARTED = -2,
    LOSS = -1,
    PLAYING = 0,
    WIN = 1,
}

const WIDTH = 16;
const HEIGHT = 16;

const Minesweeper: React.FC = () => {
    const [width, setWidth] = useState(16);
    const [height, setHeight] = useState(16);
    const [mines, setMines] = useState(64);

    const [gameState, setGameState] = useState<number>(GameState.NOT_STARTED);
    const [board, setBoard] = useState(() => baseBoard(WIDTH, HEIGHT));

    const handleClick = createHandleClickFactory({
        gameState,
        setGameState,
        board,
        setBoard,
        mines,
        width,
        height,
    });

    useEffect(() => {
        if (gameState === GameState.NOT_STARTED) {
            setBoard(baseBoard(width, height));
        }
    }, [width, height, gameState]);

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

            {gameState === GameState.WIN && <h1>You won!</h1>}
            {gameState === GameState.LOSS && <h1>You lost!</h1>}
        </>
    );
};

export default Minesweeper;
