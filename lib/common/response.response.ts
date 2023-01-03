import BaseResponse from "./base.response";

export class Response<T extends BaseResponse = {}> extends BaseResponse {
    message: string;
    data: T;
}
