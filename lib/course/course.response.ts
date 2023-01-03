import { CapacityType, Status } from "./course";
import BaseResponse from "lib/common/base.response";

export class CourseResponse extends BaseResponse {
    courseId: number;
    name: string;
    description: string;
    ageMin: number;
    ageMax: number;
    status: Status;
    showInWeb: boolean;
    capacityType: CapacityType;
}
