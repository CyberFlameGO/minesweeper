import React, { useEffect, useState } from "react";

const stringify = (obj: any) => btoa(JSON.stringify(obj));
const parse = (json: string) => JSON.parse(atob(json));

export const useStoredState = <T>(
    name: string,
    initialValue: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] => {
    const stored = localStorage.getItem(name);

    const [state, setState] = useState<T>(
        stored ? parse(stored) : initialValue
    );

    useEffect(() => {
        localStorage.setItem(name, stringify(state));
    }, [name, state]);

    const clearState = () => {
        localStorage.removeItem(name);
    };

    return [state, setState, clearState];
};
