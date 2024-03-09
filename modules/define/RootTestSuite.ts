import { Awaitable } from "./Awaitable";
import {
	AfterAllFn,
	AfterEachFn,
	BeforeAllFn,
	BeforeEachFn,
	DefinedSuite,
} from "./DefinedSuite";
import TestSuite, { TestFn } from "./TestSuite";

export default class RootTestSuite implements TestSuite {
	private readonly root: ParentSuite = {
		children: [],
		beforeAll: [],
		beforeEach: [],
		afterEach: [],
		afterAll: [],
	};

	private current: ParentSuite = this.root;

	constructor(private name: string = "") {}

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
		};
		parent.children.push(child);
		this.current = child;
		fn();
		this.current = parent;
	}

	it(name: string, fn: TestFn): void {
		const test: Test = {
			name,
			parent: this.current,
			run: fn,
		};
		this.current.children.push(test);
	}

	beforeAll(fn: BeforeAllFn): void {
		this.current.beforeAll.push(fn);
	}

	beforeEach(fn: BeforeEachFn): void {
		this.current.beforeEach.push(fn);
	}

	afterEach(fn: AfterEachFn): void {
		this.current.afterEach.push(fn);
	}

	afterAll(fn: AfterAllFn): void {
		this.current.afterAll.push(fn);
	}

	definition(): DefinedSuite {
		return {
			...this.root,
			name: this.name,
		};
	}
}

type Suite = {
	readonly name: string;
	children: (ChildSuite | Test)[];
	beforeAll: BeforeAllFn[];
	beforeEach: BeforeEachFn[];
	afterEach: AfterEachFn[];
	afterAll: AfterAllFn[];
};

type ParentSuite = Omit<Suite, "name">;

type ChildSuite = Suite & {
	readonly parent: ParentSuite;
};

type Test = {
	readonly name: string;
	readonly parent: ParentSuite;
	run(): Awaitable<void>;
};
