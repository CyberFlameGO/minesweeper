import { LastElement } from "../array";

type F<T> = (arg: T, ...args: any) => any;

export const pipe = <T>(...functions: Array<F<T>>) => (
    arg: T
): ReturnType<LastElement<typeof functions>> =>
    functions.reduce((prev, cur) => cur(prev), arg);
