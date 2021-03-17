export type Length<T extends any[]> = T extends { length: infer L } ? L : never;
export type DropFirst<T extends any[]> = ((...args: T) => any) extends (
    arg: any,
    ...rest: infer U
) => any
    ? U
    : T;

export type LastElement<T extends any[]> = T[Length<DropFirst<T>>];

export const array = (length: number) => Array<null>(length).fill(null);

export const array2d = (width: number) => (height: number) => <T>(
    value: T
): T[][] =>
    Array(height)
        .fill(null)
        .map(() => Array(width).fill(value));

export const area = (arr: number[][]) => (
    x1: number,
    y1: number,
    x2: number,
    y2: number
) =>
    array(y2 + 1 - y1).map((_, y) =>
        array(x2 + 1 - x1).map((_, x) => ({
            x: x1 + x,
            y: y1 + y,
            value: arr[y1 + y][x1 + x],
        }))
    );
