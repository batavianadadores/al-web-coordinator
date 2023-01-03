import BaseModel from "./base.model";

export class PaginationModel<T extends BaseModel> extends BaseModel {
    totalItems: number;
    items: T[];
}
