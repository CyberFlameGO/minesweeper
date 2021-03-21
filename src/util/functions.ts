import React from "react";
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

export const element = (n: number) => <T>(array: Array<T>) => array[n];

export const className = (classNames: { [key: string]: boolean }) =>
    Object.entries(classNames).filter(element(1)).map(element(0)).join(" ");

export const unique = <T>(arr: T[], keys: string[]) => (it: any) =>
    !arr.find((x: any) => keys.every((key) => x[key] === it[key]));

export const preventDefault: React.EventHandler<any> = (event) =>
    event.preventDefault();

export const either = <T>(...values: T[]) => (value: T) =>
    values.some((it) => it === value);
