import React from "react";
import { LastElement } from "./array";

type F<T> = (arg: T, ...args: any) => any;

export const pipe = <T>(...functions: Array<F<T>>) => (
    arg: T
): ReturnType<LastElement<typeof functions>> =>
    functions.reduce((prev, cur) => cur(prev), arg);

export const notNull = <T extends unknown>(x: T): x is Exclude<T, null> =>
    x !== null;

export const element = (n: number) => <T>(array: Array<T>) => array[n];

export const className = (classNames: { [key: string]: boolean }) =>
    Object.entries(classNames).filter(element(1)).map(element(0)).join(" ");

export const preventDefault: React.EventHandler<any> = (event) =>
    event.preventDefault();

export const either = <T>(...values: T[]) => (value: T) =>
    values.some((it) => it === value);

export const toggle = (bool: boolean) => !bool;
