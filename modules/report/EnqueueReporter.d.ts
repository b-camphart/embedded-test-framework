export interface EnqueueReporter {
    onEnqueueSuite(id: string, name: string): void;
    onSuiteEnqueued(id: string): void;

    onTestEnqueued(id: string, name: string): void;
}