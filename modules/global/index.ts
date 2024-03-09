import { globalSuite as suite } from "./run";

// make sure you have your tsconfig.json compilerOptions set to strictBindCallApply
// to get proper typing of these.
export const describe = suite.describe.bind(suite);
export const it = suite.it.bind(suite);
export const beforeAll = suite.beforeAll.bind(suite);
export const beforeEach = suite.beforeEach.bind(suite);
export const afterEach = suite.afterEach.bind(suite);
export const afterAll = suite.afterAll.bind(suite);

