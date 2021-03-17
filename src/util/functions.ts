import { LastElement } from "./array";

export const pipe = <
    Argument,
    Functions extends Array<(arg: Argument, ...args: any[]) => any>,
    Return extends ReturnType<LastElement<Functions>>
>(
    arg: Argument,
    ...functions: Functions
): Return => functions.reduce((prev, cur) => cur(prev), arg) as Return;

export const notNull = <T extends unknown>(x: T): x is Exclude<T, null> =>
    x !== null;

// start match

type ConditionFunction<T> = (arg: T) => boolean;

const isConditionFunction = <T>(
    c: T | ConditionFunction<T>
): c is ConditionFunction<T> => typeof c === "function";

interface MatchObject<T, F = (arg: T) => any> {
    on: (condition: T | ConditionFunction<T>, fn: F) => MatchObject<T>;
    otherwise: (fn: F) => any;
}

const matched = <T>(x: T): MatchObject<T> => ({
    on: () => matched(x),
    otherwise: () => null,
});

export const match = <T>(x: T): MatchObject<T> => ({
    on: (condition, fn) =>
        (isConditionFunction(condition) && condition(x)) || x === condition
            ? matched(fn(x))
            : match(x),
    otherwise: (fn) => fn(x),
});

// end match
