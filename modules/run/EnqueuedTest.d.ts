import { AfterEachFn, BeforeEachFn } from "../define/DefinedSuite";
import { TestReporter } from "../report/TestReporter";

export type EnqueuedTest = (
	reporter: TestReporter,
	beforeEach: readonly BeforeEachFn[],
	afterEach: readonly AfterEachFn[],
) => Promise<PotentialFailure>;

type PotentialFailure = any | undefined;