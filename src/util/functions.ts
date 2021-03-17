import { LastElement } from "./array";

export const pipe = <
    Argument,
    Functions extends Array<(arg: Argument, ...args: any[]) => any>,
    Return extends ReturnType<LastElement<Functions>>
>(
    arg: Argument,
    ...functions: Functions
): Return => functions.reduce((prev, cur) => cur(prev), arg) as Return;
