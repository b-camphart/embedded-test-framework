import { AfterEachFn, BeforeEachFn } from "../define/DefinedSuite";
import { DefinedTest } from "../define/DefinedTest";
import { EnqueueReporter } from "../report/EnqueueReporter";
import { TestReporter } from "../report/TestReporter";
import { EnqueuedTest, PotentialFailure } from "./EnqueuedTest";

/**
 * Prepares the test for a future run.
 *
 * If any `beforeEach` function fails, the rest will not be run, nor will the
 * test itself, and the test will be reported as a failure.
 *
 * All `afterEach` functions are called, regardless of test failure, or other
 * `afterEach` function failures.
 *
 * If any `afterEach` functions fail, the last failure will be reported with
 * the test results.
 */
export function enqueueTest(
	id: string,
	test: DefinedTest,
	reporter: EnqueueReporter,
): EnqueuedTest {
	reporter.onTestEnqueued(id, test.name);

	return async function runTest(
		reporter: TestReporter,
		beforeEach: readonly BeforeEachFn[],
		afterEach: readonly AfterEachFn[],
	) {
		reporter.onStartTest(id);
		let failure: PotentialFailure;
		try {
			// If any of these throw, this block exits.
			for (const fn of beforeEach) {
				await fn();
			}
			// Run the test if all `beforeEach` fns have succeeded.
			await test.run();
		} catch (thrown) {
			failure = thrown;
		}

		let afterTestFailure: PotentialFailure;
		for (const fn of afterEach) {
			try {
				await fn();
			} catch (thrown) {
				afterTestFailure = thrown;
			}
		}

		reporter.onEndTest(id, failure, afterTestFailure);

		return failure;
	};
}
