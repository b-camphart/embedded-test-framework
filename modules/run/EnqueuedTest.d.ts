import { TestReporter } from "../report/TestReporter";

export type EnqueuedTest = (
	reporter: TestReporter,
	beforeEach: readonly (() => Promise<void> | void)[],
	afterEach: readonly (() => Promise<void> | void)[],
) => Promise<void>;
