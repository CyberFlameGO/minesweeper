import { createMatrix } from "./matrix";

export interface ICell {
    value: number;
    open: boolean;
    flagged: boolean;
}

export const surroundingSquares = (
    square: { x: number; y: number },
    board: ICell[][]
) => {
    const squares = [];

    for (let i = -1; i <= 1; i++) {
        const y = square.y + i;
        if (y < 0 || y >= board.length) continue;

        for (let j = -1; j <= 1; j++) {
            const x = square.x + j;
            if (x < 0 || x >= board[y].length) continue;

            const cell = board[y][x];
            squares.push({ cell, x, y });
        }
    }

    return squares;
};

export const openSurroundingZeros = (
    x: number,
    y: number,
    board: ICell[][]
) => {
    board[y][x].open = true;

    if (board[y][x].value === 0) {
        surroundingSquares({ x, y }, board).forEach(({ cell, x, y }) => {
            if (!cell.open) openSurroundingZeros(x, y, board);
        });
    }
};

interface SetupBoardArguments {
    mines: number;
    width: number;
    height: number;
    click: { x: number; y: number };
}

export const baseBoard = (width: number, height: number) =>
    createMatrix<ICell>(width, height, () => ({
        value: 0,
        open: false,
        flagged: false,
    }));

export const isWin = (board: ICell[][]) =>
    board.every((row) =>
        row.every(
            (cell) =>
                (cell.value !== -1 && !cell.flagged) ||
                (cell.value === -1 && cell.flagged)
        )
    );

export const setupBoard = ({
    mines,
    width,
    height,
    click,
}: SetupBoardArguments): ICell[][] => {
    const board = baseBoard(width, height);

    for (let i = 0; i < mines; i++) {
        const y = Math.floor(Math.random() * board.length);
        const x = Math.floor(Math.random() * board[y].length);

        const nearClick = surroundingSquares({ x, y }, board).find(
            (neighbour) => neighbour.x === click.x && neighbour.y === click.y
        );

        if (!nearClick) {
            board[y][x].value = -1;
        }
    }

    return board.map((row, y) =>
        row.map((cell, x) => {
            const { value } = cell;

            if (value === -1) {
                return cell;
            }

            const surroundingMines = surroundingSquares({ x, y }, board).filter(
                ({ cell }) => cell.value === -1
            ).length;

            return { ...cell, value: surroundingMines } as ICell;
        })
    );
};
