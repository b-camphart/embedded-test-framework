export interface TestReporter {
    onStartTest(id: string): void;
    onEndTest(id: string, result: any | undefined, failureAfterTest: any | undefined): void;
}