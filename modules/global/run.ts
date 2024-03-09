import RootTestSuite from "../define/RootTestSuite";
import TestSuite from "../define/TestSuite";
import { EnqueueReporter } from "../report/EnqueueReporter";
import { SuiteReporter } from "../report/SuiteReporter";
import { enqueueSuite } from "../run/enqueueSuite";

// Change this to whatever TestSuite implementation you like
const suite = new RootTestSuite();
export const globalSuite: TestSuite = suite;

/**
 * Be careful of the order in which you call this function.  If you don't 
 * import and collect all of your tests prior to calling this function,
 * none of them will run.
 */
export function enqueueAllTests(reporter: EnqueueReporter) {
	const defined = suite.definition();

	const run = enqueueSuite("", defined, reporter);

	return {
		run: (reporter: SuiteReporter) => run(reporter, [], []),
	};
}
