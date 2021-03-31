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
