import { Arg1, Args } from "tsargs";

type ArrayMap = typeof Array.prototype.map;
type ArrayMapCallback<T> = (...args: Args<Arg1<ArrayMap>>) => T;

const isArrayMapCallback = <T>(
    x: T | ArrayMapCallback<T>
): x is ArrayMapCallback<T> => typeof x === "function";

export const createMatrix = <T>(
    width: number,
    height: number,
    defaultValue: T | ArrayMapCallback<T>
): T[][] => {
    const matrix = new Array(height)
        .fill(null)
        .map(() => new Array(width).fill(null));

    if (isArrayMapCallback(defaultValue)) {
        return matrix.map((row) => row.map(defaultValue));
    }

    return matrix.map((row) => row.fill(defaultValue));
};
