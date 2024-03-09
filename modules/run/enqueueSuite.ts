import { DefinedSuite } from "../define/DefinedSuite";
import { EnqueueReporter } from "../report/EnqueueReporter";
import { SuiteReporter } from "../report/SuiteReporter";
import { EnqueuedSuite } from "./EnqueuedSuite";
import { enqueueTest } from "./enqueueTest";

/**
 * Enqueues a test suite, and all descendent tests, for later execution.
 *
 * If any `beforeAll` function fails, all descendent tests will be reported
 * as failed, and no other `beforeAll` functions will be called.
 *
 * Every `afterAll` function will be run, regardless of test failure, or
 * individual `afterAll` failures.  The final failure from failed `afterAll`
 * functions will be reported, along with any failures of children.
 */
export function enqueueSuite(
	id: string,
	suite: DefinedSuite,
	reporter: EnqueueReporter,
): EnqueuedSuite {
	reporter.onEnqueueSuite(id, suite.name);

	const enqueuedChildren = suite.children.map(child => {
		if ("children" in child) {
			return enqueueSuite(uniqueId(), child, reporter);
		} else {
			return enqueueTest(uniqueId(), child, reporter);
		}
	});

	reporter.onSuiteEnqueued(id);

	return async function (
		reporter: SuiteReporter,
		beforeEach: readonly (() => Promise<void> | void)[],
		afterEach: readonly (() => Promise<void> | void)[],
	) {
		reporter.onStartSuite(id);

		const combinedBeforeEach = beforeEach.concat(suite.beforeEach);
		const combinedAfterEach = suite.afterEach.concat(afterEach);

		let beforeAllFailure: any | undefined;
		try {
			for (const fn of suite.beforeAll) {
				await fn();
			}
		} catch (thrown) {
			beforeAllFailure = thrown;
		}

		if (beforeAllFailure) {
			combinedBeforeEach.splice(0, 0, () => {
				throw beforeAllFailure;
			});
		}

		const childFailures: any[] = [];
		for (const fn of enqueuedChildren) {
			try {
				await fn(reporter, combinedBeforeEach, combinedAfterEach);
			} catch (thrown) {
				childFailures.push(thrown);
				reporter.onChildFailure(thrown);
			}
		}

		let afterAllFailure: any | undefined;
		for (const fn of suite.afterAll) {
			try {
				await fn();
			} catch (thrown) {
				afterAllFailure = thrown;
			}
		}

		reporter.onEndSuite(id, childFailures, afterAllFailure);
	};
}

let callCount = 0;
export function uniqueId() {
	callCount++;

	return (
		Date.now().toString(36) +
		"_" +
		Math.random().toString(36).slice(2) +
		"_" +
		callCount
	);
}