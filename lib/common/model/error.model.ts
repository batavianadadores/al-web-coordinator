export class ErrorModel {
    constructor(message: string, code?: number) {
        this.message = message;
        this.code = code;
    }
    message: string;
    code: number;
}
