import { Pagination } from "entities/common/pagination";

export interface IPaginationState<T extends object> extends Pagination<T> {
    pageSize: number;
    page: number;
    reload?: boolean;
}
