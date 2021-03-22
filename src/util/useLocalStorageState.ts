import React, { useEffect, useState } from "react";

export const useLocalStorageState = <T>(
    name: string,
    initialValue: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] => {
    const stored = localStorage.getItem(name);

    const [state, setState] = useState<T>(
        stored ? JSON.parse(stored) : initialValue
    );

    useEffect(() => {
        localStorage.setItem(name, JSON.stringify(state));
    }, [name, state]);

    const clearState = () => {
        localStorage.removeItem(name);
    };

    return [state, setState, clearState];
};
