export type DefinedTest = {
    readonly name: string;
    run(): Promise<void> | void;
}