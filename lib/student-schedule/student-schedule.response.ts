import BaseResponse from "lib/common/base.response";
import { State } from "./student-schedule";

export class StudentScheduleResponse extends BaseResponse {
    studentScheduleId: number;
    saleDetailId: number;
    studentId: number;
    init: string;
    end: string;
    state: State;
    attendanceTime?: string;
    poolId: number;
    updatedBy?: string;
    updatedAt?: string;
    attendanceBy?: string;
    isSmallPool?: boolean;
    courseId?: number;
}
