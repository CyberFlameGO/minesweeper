import { LastElement } from "../array";

type Func = (arg: any) => any;
type ArgType<F, Else = never> = F extends (arg: infer A) => any ? A : Else;

export const pipe = <F extends [Func, ...Func[]]>(...functions: F) => (
    arg: ArgType<F[0]>
): ReturnType<LastElement<F>> =>
    functions.reduce((prev, cur) => cur(prev), arg);
