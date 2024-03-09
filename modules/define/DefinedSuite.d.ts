import { DefinedTest } from "./DefinedTest";

export type DefinedSuite = {
    readonly name: string;
    readonly children: readonly (DefinedSuite | DefinedTest)[];

    readonly beforeAll: readonly (() => Promise<void> | void)[];
    readonly beforeEach: readonly (() => Promise<void> | void)[];
    readonly afterEach: readonly (() => Promise<void> | void)[];
    readonly afterAll: readonly (() => Promise<void> | void)[];
}