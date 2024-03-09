import RootTestSuite from "../define/RootTestSuite";
import TestSuite from "../define/TestSuite";
import { EnqueueReporter } from "../report/EnqueueReporter";
import { SuiteReporter } from "../report/SuiteReporter";
import { enqueueSuite } from "../run/enqueueSuite";

// Change this to whatever TestSuite implementation you like
const suite = new RootTestSuite();
export const globalSuite: TestSuite = suite;

export function enqueueAllTests(reporter: EnqueueReporter) {
	const defined = suite.definition();

	const run = enqueueSuite("", defined, reporter);

	return {
		run: (reporter: SuiteReporter) => run(reporter, [], []),
	};
}
