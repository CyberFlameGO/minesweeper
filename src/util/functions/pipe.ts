import { LastElement } from "../array";

// Types: https://stackoverflow.com/a/53175538/

type Lookup<T, K extends keyof any, Else = never> = K extends keyof T
    ? T[K]
    : Else;

type Tail<T extends any[]> = T extends [any, ...infer R] ? R : never;

type Func = (arg: any) => any;
type ArgType<F, Else = never> = F extends (arg: infer A) => any ? A : Else;
type AsChain<F extends [Func, ...Func[]], G extends Func[] = Tail<F>> = {
    [K in keyof F]: (arg: ArgType<F[K]>) => ArgType<Lookup<G, K, any>, any>;
};

export const pipe = <F extends [Func, ...Func[]]>(
    ...functions: F & AsChain<F>
) => (arg: ArgType<F[0]>): ReturnType<LastElement<F>> =>
    functions.reduce((prev, cur) => cur(prev), arg);
