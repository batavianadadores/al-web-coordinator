import { DateTime } from "luxon";

import { LevelModel } from "@lib/student/level.model";
import { StudentScheduleModel } from "@lib/student-schedule/student-schedule.model";

export type HourTableValue = {
    id: number;
    value: DateTime;
    stringValue: string;
    description: string;
    millis: number;
};

export type DayTableValue = {
    id: number;
    value: string;
    description: string;
};

export type CellValueItem = {
    level: LevelModel;
    ss: StudentScheduleModel[];
};

export type TableValues = {
    key: string;
    hour: HourTableValue;
    monday: CellValueItem[];
    tuesday: CellValueItem[];
    wednesday: CellValueItem[];
    thursday: CellValueItem[];
    friday: CellValueItem[];
    saturday: CellValueItem[];
    sunday: CellValueItem[];
};
