import { AwaitableFn } from "./Awaitable";
import { AfterAllFn, AfterEachFn, BeforeAllFn, BeforeEachFn } from "./DefinedSuite";

export default interface TestSuite {
    /**
     * @param name the name of the sub-suite of tests
     * @param fn wrapper to denote which tests are in this sub-suite.
     */
    describe(name: string, fn: () => void): void;
    it(name: string, fn: TestFn): void;
    beforeAll(fn: BeforeAllFn): void;
    beforeEach(fn: BeforeEachFn): void;
    afterEach(fn: AfterEachFn): void;
    afterAll(fn: AfterAllFn): void;
}

export type TestFn = AwaitableFn<void>