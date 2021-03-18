import { area, flatten, isIndex } from "./array";

export const validCoordinates = (board: number[][]) => (x: number, y: number) =>
    isIndex(board)(y) && isIndex(board[0])(x);

export const surroundingSquares = (board: number[][]) => (
    squareX: number,
    squareY: number
) =>
    flatten(
        area(board)(squareX - 1, squareY - 1, squareX + 1, squareY + 1)
    ).filter(
        ({ x, y }) =>
            (x !== squareX || y !== squareY) && validCoordinates(board)(x, y)
    );

export const calculateValue = (board: number[][]) => (x: number, y: number) =>
    board[y][x] === -1
        ? -1
        : surroundingSquares(board)(x, y).filter(({ value }) => value === -1)
              .length;

export const calculateValues = (board: number[][]) =>
    board.map((row, y) => row.map((_, x) => calculateValue(board)(x, y)));

export const addBombs = (percent: number) => (board: number[][]) =>
    board.map((row) =>
        row.map((val) => (Math.random() > (100 - percent) / 100 ? -1 : val))
    );

export const clearClick = (board: number[][]) => (
    clickX: number,
    clickY: number
) => {
    const calc = calculateValue(board);

    const newBoard = board.slice();

    flatten(area(newBoard)(clickX - 2, clickY - 2, clickX + 2, clickY + 2))
        .filter(({ x, y }) => validCoordinates(newBoard)(x, y))
        .forEach(({ x, y }) => (newBoard[y][x] = 0));

    surroundingSquares(board)(clickX, clickY).forEach(
        ({ x, y }) => (newBoard[y][x] = calc(x, y))
    );

    return newBoard;
};
