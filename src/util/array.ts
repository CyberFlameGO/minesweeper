export const array2d = <T>(width: number) => (height: number) => (
    value: T
): T[][] =>
    Array(height)
        .fill(null)
        .map(() => Array(width).fill(null));
