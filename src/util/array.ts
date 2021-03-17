export const array = (length: number) => Array<null>(length).fill(null);

export const array2d = <T>(width: number) => (height: number) => (
    value: T
): T[][] =>
    Array(height)
        .fill(null)
        .map(() => Array(width).fill(null));

export const area = (arr: number[][]) => (
    x1: number,
    y1: number,
    x2: number,
    y2: number
) =>
    array(y2 + 1 - y1).map((_, y) =>
        array(x2 + 1 - x1).map((_, x) => arr[y1 + y][x1 + x])
    );
