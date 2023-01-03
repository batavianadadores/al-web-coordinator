export class ErrorModel {
    constructor(message: string, code?: number) {
        this.message = message;
        this.code = code ?? 0;
    }
    message: string;
    code: number;
}
