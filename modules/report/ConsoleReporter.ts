import { EnqueueReporter } from "./EnqueueReporter";
import { SuiteReporter } from "./SuiteReporter";

export default class ConsoleReporter implements SuiteReporter, EnqueueReporter {
	constructor(private readonly verbose: boolean = false) {}

	private readonly structures = new Map<string, TestStructure>();

	private current: TestStructure = {
		id: "root",
        parent: null,
        fullName() {
            return "";
        },
		result: undefined,
	};

	onEnqueueSuite(id: string, name: string): void {
		const structure = {
			id,
			parent: this.current,
			result: undefined,
            fullName() {
                return this.parent.fullName() + " > " + name;
            }
		};
		this.current = structure;
		this.structures.set(id, structure);
	}

	onSuiteEnqueued(id: string): void {
		if (this.current.id === id && this.current.parent) {
			this.current = this.current.parent;
		}
	}

	onTestEnqueued(id: string, name: string): void {
		const structure = {
			id,
			parent: this.current,
			result: undefined,
            fullName() {
                return this.parent.fullName() + " > " + name;
            }
		};
		this.structures.set(id, structure);
	}

	onStartSuite(id: string): void {}

	onStartTest(id: string): void {
		if (this.verbose) {
			const structure = this.structures.get(id);
            if (!structure) {
                return;
            }
			console.log("Running", structure.fullName());
		}
	}

	onEndTest(
		id: string,
		result: any | undefined,
		failureAfterTest: any | undefined,
	): void {
        const structure = this.structures.get(id);
        const name = structure?.fullName() ?? "";
        if (!!result) {
            console.log("failed", name);
        } else if (this.verbose) {
            console.log("passed", name);
        }
    }

	onChildFailure(error: any): void {}

	onEndSuite(
		id: string,
		childFailures: readonly any[],
		afterAllFailure: any | undefined,
	): void {}
}

type TestStructure = {
	readonly id: string;
    readonly parent: TestStructure | null,
	result: any | undefined;
	fullName(): string;
};