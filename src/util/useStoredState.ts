import React, { useEffect, useState } from "react";
import { pipe } from "./functions";

const process = (
    data: string,
    callback: (x: string) => string,
    iterations: number
) => pipe(data, ...Array(iterations).fill(callback));

const createEncode = (i: number) => (data: string) => process(data, btoa, i);
const createDecode = (i: number) => (data: string) => process(data, atob, i);

const { parse, stringify } = JSON;

export const useStoredState = <T>(
    name: string,
    initialValue: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] => {
    const ENCODE_DEPTH = 1;

    const encode = createEncode(ENCODE_DEPTH);
    const decode = createDecode(ENCODE_DEPTH);

    const storedName = encode(name);
    const stored = localStorage.getItem(storedName);

    const [state, setState] = useState<T>(
        stored ? parse(decode(stored)) : initialValue
    );

    useEffect(() => {
        localStorage.setItem(storedName, encode(stringify(state)));
    }, [storedName, state, encode]);

    const clearState = () => {
        localStorage.removeItem(storedName);
    };

    return [state, setState, clearState];
};
