import { BoardCell } from "../Minesweeper";
import { area, flatten } from "./array";

export const addBombsPercent = (percent: number) => (board: BoardCell[][]) =>
    board.map((row) =>
        row.map(({ ...values }) =>
            Math.random() > (100 - percent) / 100
                ? { ...values, value: -1 }
                : { ...values }
        )
    );

export const surroundingSquares = (
    board: BoardCell[][],
    cx: number,
    cy: number
) =>
    area(board)(cx - 1, cy - 1, cx + 1, cy + 1).filter(
        ({ x, y }) => x !== cx || y !== cy
    );

const calculateValue = (board: BoardCell[][], x: number, y: number) =>
    board[y][x].value === -1
        ? -1
        : surroundingSquares(board, x, y)
              .map(({ value }) => value)
              .filter(({ value }) => value === -1).length;

export const calculateValues = (board: BoardCell[][]) => {
    return board.map((row, y) =>
        row.map(({ ...values }, x) => ({
            ...values,
            value: calculateValue(board, x, y),
        }))
    );
};

export const clearClick = (board: BoardCell[][]) => (x: number, y: number) => {
    const RADIUS = 1;
    const newBoard = board.slice();

    area(board)(x - RADIUS, y - RADIUS, x + RADIUS, y + RADIUS).forEach(
        ({ x, y }) => (newBoard[y][x].value = 0)
    );

    const CALCULATION_RADIUS = RADIUS + 1;

    area(board)(
        x - CALCULATION_RADIUS,
        y - CALCULATION_RADIUS,
        x + CALCULATION_RADIUS,
        y + CALCULATION_RADIUS
    ).forEach(
        ({ x, y }) => (newBoard[y][x].value = calculateValue(board, x, y))
    );

    return newBoard;
};

export const won = (board: BoardCell[][]) => {
    const flattenedBoard = flatten(board);

    const bombs = flattenedBoard.filter(({ value }) => value === -1);

    const allBombsFlagged = bombs.every(({ flagged }) => flagged);

    const win =
        allBombsFlagged &&
        flattenedBoard.filter(({ flagged }) => flagged).length === bombs.length;

    return win;
};
