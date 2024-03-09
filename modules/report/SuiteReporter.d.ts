import { TestReporter } from "./TestReporter";

export interface SuiteReporter extends TestReporter {
	onStartSuite(id: string): void;
	onChildFailure(error: any): void;
	onEndSuite(
		id: string,
		childFailures: readonly any[],
		afterAllFailures: readonly any[],
	): void;
}
