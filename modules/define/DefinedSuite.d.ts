import { AwaitableFn } from "./Awaitable";
import { DefinedTest } from "./DefinedTest";

export type DefinedSuite = {
    readonly name: string;
    readonly children: readonly (DefinedSuite | DefinedTest)[];

    readonly beforeAll: readonly BeforeAllFn[];
    readonly beforeEach: readonly BeforeEachFn[];
    readonly afterEach: readonly AfterEachFn[];
    readonly afterAll: readonly AfterAllFn[];
}

export type BeforeAllFn = AwaitableFn<void>;
export type BeforeEachFn = AwaitableFn<void>;
export type AfterEachFn = AwaitableFn<void>;
export type AfterAllFn = AwaitableFn<void>;