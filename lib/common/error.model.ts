import BaseModel from "./base.model";

export class ErrorModel extends BaseModel {
    constructor(message: string, code?: number) {
        super();
        this.message = message;
        this.code = code ?? 0;
    }
    message: string;
    code: number;
}
