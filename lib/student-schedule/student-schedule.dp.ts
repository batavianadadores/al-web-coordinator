import BaseDataProvider from "@lib/common/base.dp";
import { PaginationResponse } from "lib/common/pagination.response";
import { StudentScheduleResponse } from "./student-schedule.response";

export class StudentScheduleDP extends BaseDataProvider {
    constructor(urlBase: string) {
        super(urlBase);
    }

    list(
        token: string,
        from: string,
        to: string,
        poolId: number
    ): Promise<PaginationResponse<StudentScheduleResponse>> {
        const params = {
            from,
            to,
            poolId: poolId.toString(),
        };

        return this.fetch.get<PaginationResponse<StudentScheduleResponse>>(
            "/studentSchedule",
            params,
            token
        );
    }
}
