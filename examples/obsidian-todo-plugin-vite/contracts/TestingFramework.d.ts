export interface TestingFramework {
    describe(name: string, fn: () => void): void;
    it(name: string, fn: () => Promise<void> | void): void;
    beforeAll(fn: () => Promise<void> | void): void;
    beforeEach(fn: () => Promise<void> | void): void;
    afterEach(fn: () => Promise<void> | void): void;
    afterAll(fn: () => Promise<void> | void): void;
}