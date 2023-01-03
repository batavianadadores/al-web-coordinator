import BaseModel from "@lib/common/base.model";
import { CapacityType, Status } from "./course";

export class CourseModel extends BaseModel {
    courseId: number;
    name: string;
    description: string;
    ageMin: number;
    ageMax: number;
    status: Status;
    showInWeb: boolean;
    capacityType: CapacityType;

    clone() {
        const clone = new CourseModel();
        Object.assign(clone, this);
        return clone;
    }
}
