import React, { useEffect, useState } from "react";
import { repeat } from "./functions";
import { pipe } from "./functions/pipe";

const process = (data: string, callback: (x: string) => string, n: number) =>
    pipe(...repeat(n)(callback))(data);

const createEncode = (i: number) => (data: string) => process(data, btoa, i);
const createDecode = (i: number) => (data: string) => process(data, atob, i);

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
        stored ? JSON.parse(decode(stored)) : initialValue
    );

    useEffect(() => {
        localStorage.setItem(storedName, encode(JSON.stringify(state)));
    }, [storedName, state, encode]);

    const clearState = () => {
        localStorage.removeItem(storedName);
    };

    return [state, setState, clearState];
};
