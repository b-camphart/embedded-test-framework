import { SuiteReporter } from "../report/SuiteReporter";

export type EnqueuedSuite = (
	reporter: SuiteReporter,
	beforeEach: readonly (() => Promise<void> | void)[],
	afterEach: readonly (() => Promise<void> | void)[],
) => Promise<void>;
