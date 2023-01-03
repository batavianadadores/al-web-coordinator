import BaseController from "lib/common/base.controller";
import { StudentScheduleDP } from "./student-schedule.dp";
import { StudentScheduleModel } from "./student-schedule.model";

export class StudentScheduleController extends BaseController {
    protected dataProvider: StudentScheduleDP;

    constructor(urlBase: string) {
        super(urlBase);

        this.dataProvider = new StudentScheduleDP(urlBase);
    }

    list(
        token: string,
        from: string,
        to: string,
        poolId: number
    ): Promise<StudentScheduleModel[]> {
        return this.executeDataProviderAsync(
            async (token: string, from: string, to: string, poolId: number) => {
                const response = await this.dataProvider.list(
                    token,
                    from,
                    to,
                    poolId
                );
                const model = response.items.map((e) =>
                    this.transformResponseToModel(e, StudentScheduleModel)
                );
                return model;
            },
            token,
            from,
            to,
            poolId
        );
    }
}
