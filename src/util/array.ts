export type Length<T extends any[]> = T extends { length: infer L } ? L : never;
export type DropFirst<T extends any[]> = ((...args: T) => any) extends (
    arg: any,
    ...rest: infer U
) => any
    ? U
    : T;

export type LastElement<T extends any[]> = T[Length<DropFirst<T>>];

export const array = (length: number) => Array<null>(length).fill(null);

export const array2d = <T>(width: number, height: number, value: T): T[][] =>
    Array(height)
        .fill(null)
        .map(() => Array(width).fill(value));

export const flatten = <T>(arr2d: T[][]): T[] =>
    arr2d.reduce((prev, cur) => [...prev, ...cur], []);

export const count = <T>(array: T[]) => (
    callback: (x: T) => boolean
): number => {
    let c = 0;
    for (const element of array) {
        if (callback(element)) {
            c += 1;
        }
    }
    return c;
};

export const isIndex = (arr: any[]) => (i: number) => i >= 0 && i < arr.length;

export const addIfNotNull = <T>(arr: T[], value: T | null) =>
    value === null ? arr : [...arr, value];

export const area = <T>(matrix: T[][]) => (
    x1: number,
    y1: number,
    x2: number,
    y2: number
) => {
    const yLength = y2 - y1 + 1;
    const xLength = x2 - x1 + 1;

    const elements = [];

    for (let offsetY = 0; offsetY < yLength; offsetY++) {
        const y = y1 + offsetY;
        if (!isIndex(matrix)(y)) continue;

        for (let offsetX = 0; offsetX < xLength; offsetX++) {
            const x = x1 + offsetX;
            if (!isIndex(matrix[y])(x)) continue;

            elements.push({ x, y, value: matrix[y][x] });
        }
    }

    return elements;
};
