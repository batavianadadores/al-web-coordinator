export type Arguments<T> = T extends (...args: infer A) => any ? A : never;
export type Return<T> = T extends (...args: any[]) => infer R ? R : never;
export class CancelablePromise<T> extends Promise<T> {
    cancel: () => void;
}
