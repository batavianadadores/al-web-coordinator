import BaseResponse from "./base.response";

export class PaginationResponse<T extends BaseResponse> extends BaseResponse {
    totalItems: number;
    items: T[];
}
