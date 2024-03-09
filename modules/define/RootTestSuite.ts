import { DefinedSuite } from "./DefinedSuite";
import TestSuite from "./TestSuite";

export default class RootTestSuite implements TestSuite {
	private readonly root: ParentSuite = {
		children: [],
		beforeAll: [],
		beforeEach: [],
		afterEach: [],
		afterAll: [],
	};

	private current: ParentSuite = this.root;

	constructor(private name: string = "") {
	}

	describe(name: string, fn: () => void): void {
		const parent = this.current;
		const child: ChildSuite = {
			name,
			parent,
			children: [],
			beforeAll: [],
			beforeEach: [],
			afterEach: [],
			afterAll: [],
		}
		parent.children.push(child);
		this.current = child;
		fn();
		this.current = parent;
	}

	it(name: string, fn: () => void | Promise<void>): void {
		const test: Test = {
			name,
			parent: this.current,
			run: fn,
		};
		this.current.children.push(test);
	}

	beforeAll(fn: () => void | Promise<void>): void {
		this.current.beforeAll.push(fn);
	}

	beforeEach(fn: () => void | Promise<void>): void {
		this.current.beforeEach.push(fn);
	}

	afterEach(fn: () => void | Promise<void>): void {
		this.current.afterEach.push(fn);
	}

	afterAll(fn: () => void | Promise<void>): void {
		this.current.afterAll.push(fn);
	}

    definition(): DefinedSuite {
        return {
            ...this.root,
            name: this.name,
        }
    }
}

type Suite = {
	readonly name: string;
	children: (ChildSuite | Test)[];
	beforeAll: (() => Promise<void> | void)[];
	beforeEach: (() => Promise<void> | void)[];
	afterEach: (() => Promise<void> | void)[];
	afterAll: (() => Promise<void> | void)[];
};

type ParentSuite = Omit<Suite, "name">;

type ChildSuite = Suite & {
	readonly parent: ParentSuite;
};

type Test = {
	readonly name: string;
	readonly parent: ParentSuite;
	run(): Promise<void> | void;
};
