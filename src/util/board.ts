import { area } from "./array";

export const surroundingSquares = (board: number[][]) => (
    squareX: number,
    squareY: number
) =>
    area(board)(squareX - 1, squareY - 1, squareX + 1, squareY + 1)
        .reduce((prev, cur) => [...prev, ...cur], [])
        .filter(({ x, y }) => x !== squareX || y !== squareY);

export const calculateValue = (board: number[][]) => (x: number, y: number) =>
    surroundingSquares(board)(x, y).filter(({ value }) => value === -1).length;

export const calculateValues = (board: number[][]) =>
    board.map((row, y) => row.map((_, x) => calculateValue(board)(x, y)));

export const addBombs = (board: number[][]) => (percent: number) =>
    board.map((row) =>
        row.map((val) => (Math.random() > percent / 100 ? -1 : val))
    );
