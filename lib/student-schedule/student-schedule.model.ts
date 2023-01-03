import { DateTime } from "luxon";

import { State } from "./student-schedule";
import BaseModel from "@lib/common/base.model";

export class StudentScheduleModel extends BaseModel {
    studentScheduleId: number;
    saleDetailId: number;
    studentId: number;
    end: string;
    state: State;
    attendanceTime?: string;
    poolId: number;
    updatedBy?: string;
    updatedAt?: string;
    attendanceBy?: string;
    isSmallPool?: boolean;
    courseId?: number;

    clone() {
        const clone = new StudentScheduleModel();
        Object.assign(clone, this);
        return clone;
    }

    private _init: string;
    private _initDateTime?: DateTime;
    private _initHourString?: string;
    private _initWeekDay: number;

    set init(value) {
        this._init = value;
        if (!value) {
            this._initDateTime = undefined;
            this._initHourString = undefined;
        }

        const dateTime = DateTime.fromISO(value);
        this._initDateTime = dateTime;
        this._initHourString = dateTime.toFormat("HH:mm:ssZZ");
        this._initWeekDay = dateTime.get("weekday");
    }
    get init() {
        return this._init;
    }
    get initDateTime() {
        return this._initDateTime;
    }
    get initHourString() {
        return this._initHourString;
    }
    get initWeekDay() {
        return this._initWeekDay;
    }
}
