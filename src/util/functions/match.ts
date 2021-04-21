type ConditionFunction<T> = (arg: T) => boolean;

const isConditionFunction = <T>(
    c: T | ConditionFunction<T>
): c is ConditionFunction<T> => typeof c === "function";

interface MatchObject<T> {
    on: (
        condition: T | ConditionFunction<T>,
        fn: Function,
        ...args: any[]
    ) => MatchObject<T>;
    otherwise: (fn: Function) => any;
}

const match = <T>(x: T): MatchObject<T> => ({
    on: (condition, fn, ...args) => {
        if (
            (isConditionFunction(condition) && condition(x)) ||
            x === condition
        ) {
            fn(x, ...args);
        }

        return match(x);
    },
    otherwise: (fn) => fn(x),
});

export default match;
