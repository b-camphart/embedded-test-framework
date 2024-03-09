export type Awaitable<T> = Promise<T> | T;
export type AwaitableFn<T> = () => Awaitable<T>;