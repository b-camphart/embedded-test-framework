import { Awaitable } from "./Awaitable";

export type DefinedTest = {
    readonly name: string;
    run(): Awaitable<void>;
}