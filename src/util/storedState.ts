import React, { useEffect, useState } from "react";
import { parse, stringify } from "zipson";

const removeNonLatin = (string: string) =>
    string.replace(
        /[\u00A0-\u2666]/g,
        (char) => "&#" + char.charCodeAt(0) + ";"
    );

const addBackNonLatin = (string: string) =>
    string.replace(/&#(\d+);/g, (match) => {
        const groups = match.match(/&#(\d+);/);
        return String.fromCharCode(parseInt(groups![1], 10));
    });

const parseString = (data: string) => parse(addBackNonLatin(atob(data)));
const stringifyObject = (data: any) => btoa(removeNonLatin(stringify(data)));

export const useStoredState = <T>(
    name: string,
    initialValue: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] => {
    const storedName = name;
    const stored = localStorage.getItem(storedName);

    const [state, setState] = useState<T>(
        stored ? parseString(stored) || initialValue : initialValue
    );

    useEffect(() => {
        localStorage.setItem(storedName, stringifyObject(state));
    }, [storedName, state]);

    const clearState = () => {
        localStorage.removeItem(storedName);
    };

    return [state, setState, clearState];
};

export const getStoredState = <T>(name: string, fallback: T): T => {
    const item = localStorage.getItem(name);

    if (item !== null) {
        return parseString(item);
    }

    return fallback;
};
