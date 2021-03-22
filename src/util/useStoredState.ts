import React, { useEffect, useState } from "react";

const encode = (data: string) => btoa(data);
const decode = (data: string) => atob(data);

const { parse, stringify } = JSON;

export const useStoredState = <T>(
    name: string,
    initialValue: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] => {
    const storedName = encode(name);
    const stored = localStorage.getItem(storedName);

    const [state, setState] = useState<T>(
        stored ? parse(decode(stored)) : initialValue
    );

    useEffect(() => {
        localStorage.setItem(storedName, encode(stringify(state)));
    }, [storedName, state]);

    const clearState = () => {
        localStorage.removeItem(storedName);
    };

    return [state, setState, clearState];
};
