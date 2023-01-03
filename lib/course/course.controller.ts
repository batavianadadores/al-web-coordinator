import BaseController from "lib/common/base.controller";
import { CourseAddParams } from "./course-add.params";
import { CourseUpdateParams } from "./course-update.params";
import { CourseDP } from "./course.dp";
import { CourseModel } from "./course.model";

export class CourseController extends BaseController {
    protected dataProvider: CourseDP;

    constructor(urlBase: string) {
        super(urlBase);

        this.dataProvider = new CourseDP(urlBase);
    }

    list(token: string): Promise<CourseModel[]> {
        return this.executeDataProviderAsync(async (token: string) => {
            const response = await this.dataProvider.list(token, true);
            const model = response.items.map((e) =>
                this.transformResponseToModel(e, CourseModel)
            );
            return model;
        }, token);
    }

    get(token: string, courseId: number): Promise<CourseModel> {
        return this.executeDataProviderAsync(
            async (token: string, courseId: number) => {
                const response = await this.dataProvider.get(token, courseId);
                const model = this.transformResponseToModel(
                    response,
                    CourseModel
                );
                return model;
            },
            token,
            courseId
        );
    }

    add(token: string, params: CourseAddParams): Promise<number> {
        return this.executeDataProviderAsync(
            async (token: string, params: CourseAddParams) => {
                const response = await this.dataProvider.add(token, params);
                return response.data;
            },
            token,
            params
        );
    }

    update(
        token: string,
        courseId: number,
        params: CourseUpdateParams
    ): Promise<string> {
        return this.executeDataProviderAsync(
            async (
                token: string,
                courseId: number,
                params: CourseUpdateParams
            ) => {
                const response = await this.dataProvider.update(
                    token,
                    courseId,
                    params
                );
                return response.message;
            },
            token,
            courseId,
            params
        );
    }
}
