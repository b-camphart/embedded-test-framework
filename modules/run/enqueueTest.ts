import { DefinedTest } from "../define/DefinedTest";
import { EnqueueReporter } from "../report/EnqueueReporter";
import { TestReporter } from "../report/TestReporter";
import { EnqueuedTest } from "./EnqueuedTest";

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

	return async function (
		reporter: TestReporter,
		beforeEach: readonly (() => Promise<void> | void)[],
		afterEach: readonly (() => Promise<void> | void)[],
	) {
		reporter.onStartTest(id);
		let failure: any | undefined;
		try {
			for (const fn of beforeEach) {
				await fn();
			}
			await test.run();
		} catch (thrown) {
			failure = thrown;
			throw thrown;
		} finally {
			let afterTestFailure: any | undefined;
			for (const fn of afterEach) {
				try {
					await fn();
				} catch (thrown) {
					afterTestFailure = thrown;
				}
			}

			reporter.onEndTest(id, failure, afterTestFailure);
		}
	};
}

