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

export const className = (classNames: { [key: string]: boolean }) => {
    let name = "";

    for (const key in classNames) {
        if (classNames[key] === true) {
            name += ` ${key}`;
        }
    }

    return name;
};

export const unique = <T>(arr: T[], keys: string[]) => (it: any) =>
    !arr.find((x: any) => keys.every((key) => x[key] === it[key]));
