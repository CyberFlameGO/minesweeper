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

const match = <T>(x: T): MatchObject<T> => ({
    on: (condition, fn) =>
        (isConditionFunction(condition) && condition(x)) || x === condition
            ? matched(fn(x))
            : match(x),
    otherwise: (fn) => fn(x),
});

export default match;
