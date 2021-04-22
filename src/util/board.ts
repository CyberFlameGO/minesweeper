import { BoardCell } from "../Minesweeper";
import { area, flatten } from "./array";
import { createFilter } from "./functions";

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
): BoardCell[] =>
    flatten(area(board)(cx - 1, cy - 1, cx + 1, cy + 1))
        .filter(
            createFilter(
                ({ x, y }) => x !== cx || y !== cy,
                ({ value }) => value !== undefined
            )
        )
        .map(({ value }) => value);

const calculateValue = (board: BoardCell[][], x: number, y: number) =>
    board[y][x].value === -1
        ? -1
        : surroundingSquares(board, x, y).filter(({ value }) => value === -1)
              .length;

export const calculateValues = (board: BoardCell[][]) => {
    return board.map((row, y) =>
        row.map(({ ...values }, x) => ({
            ...values,
            value: calculateValue(board, x, y),
        }))
    );
};
