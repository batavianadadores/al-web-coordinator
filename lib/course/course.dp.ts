import BaseDataProvider from "@lib/common/base.dp";
import { CourseResponse } from "./course.response";
import { CourseAddParams } from "./course-add.params";
import { Response } from "@lib/common/response.response";
import { CourseUpdateParams } from "./course-update.params";

export class CourseDP extends BaseDataProvider {
    constructor(urlBase: string) {
        super(urlBase);
    }

    list(token: string, basic?: boolean, web?: boolean) {
        const params: { basic?: string; web?: string } = {};
        if (basic !== undefined) {
            params["basic"] = basic ? "true" : "false";
        }
        if (web !== undefined) {
            params["web"] = web ? "true" : "false";
        }
        return this.fetch.get<APIPaginationResponse<CourseResponse>>(
            "/course",
            params,
            token
        );
    }

    get(token: string, courseId: number) {
        return this.fetch.get<CourseResponse>(
            `/course/${courseId}`,
            undefined,
            token
        );
    }

    add(token: string, params: CourseAddParams) {
        return this.fetch.post<Response<number>>(
            "/course",
            params,
            undefined,
            token
        );
    }

    update(token: string, courseId: number, params: CourseUpdateParams) {
        return this.fetch.patch<Response>(
            `/course/${courseId}`,
            params,
            undefined,
            token
        );
    }
}
