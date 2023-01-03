export class APIResponse<T = any | never> {
    message: string;
    data?: T;
}
