import RootTestSuite from "../define/RootTestSuite";
import TestSuite from "../define/TestSuite";

// change this to whichever implementation you'd like
const suite: TestSuite = new RootTestSuite();

// make sure you have your tsconfig.json compilerOptions set to strictBindCallApply
// to get proper typing of these.
export const describe = suite.describe.bind(suite);
export const it = suite.it.bind(suite);
export const beforeAll = suite.beforeAll.bind(suite);
export const beforeEach = suite.beforeEach.bind(suite);
export const afterEach = suite.afterEach.bind(suite);
export const afterAll = suite.afterAll.bind(suite);
