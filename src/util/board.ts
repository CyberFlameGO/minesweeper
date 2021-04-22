import { BoardCell } from "../Minesweeper";

export const addBombsPercent = (percent: number) => (board: BoardCell[][]) =>
    board.map((row) =>
        row.map(({ ...values }) =>
            Math.random() > (100 - percent) / 100
                ? { ...values, value: -1 }
                : { ...values }
        )
    );
