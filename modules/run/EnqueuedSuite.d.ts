import { AfterEachFn, BeforeEachFn } from "../define/DefinedSuite";
import { SuiteReporter } from "../report/SuiteReporter";

export type EnqueuedSuite = (
	reporter: SuiteReporter,
	beforeEach: readonly BeforeEachFn[],
	afterEach: readonly AfterEachFn[],
) => Promise<void>;
