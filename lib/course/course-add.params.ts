import { CapacityType, Status } from "./course";

export class CourseAddParams {
    name: string;
    description?: string;
    ageMin?: number;
    ageMax?: number;
    status?: Status;
    showInWeb?: boolean;
    capacityType?: CapacityType;
}
