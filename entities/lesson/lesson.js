const { modelFromObject } = require("../utils");
const Student = require("../student/student");

/**
 * @typedef State
 * @type {('pending'|'attended'|'missed'|'recovered'|'to_recover'|'canceled'|'frozen'|'transferred')}
 */

const States = Object.freeze({
    all: [
        "pending",
        "attended",
        "missed",
        "recovered",
        "to_recover",
        "canceled",
        "frozen",
        "transferred",
    ],
    pending: {
        key: "pending",
        description: "Pendiente",
    },
    attended: {
        key: "attended",
        description: "Asistida",
    },
    missed: {
        key: "missed",
        description: "Perdida",
    },
    recovered: {
        key: "recovered",
        description: "Recuperada",
    },
    to_recover: {
        key: "to_recover",
        description: "Por recuperar",
    },
    canceled: {
        key: "canceled",
        description: "Cancelada",
    },
    frozen: {
        key: "frozen",
        description: "Congelada",
    },
    transferred: {
        key: "transferred",
        description: "Transferida",
    },
});

/**
 * @typedef {object} Lesson
 * @property {number} studentScheduleId         - Lesson id (studentScheduleId), min 1
 * @property {number} saleDetailId              - Sale detail id, min 1
 * @property {number} studentId                 - Student id, min 1
 * @property {string} init                      - Init, date string
 * @property {string} end                       - End, date string
 * @property {LessonState} state                - State
 * @property {string} [attendanceTime]          - Attendance time
 * @property {number} poolId                    - Pool id (sucursal)
 * @property {string} [updatedBy]               - Updated by, max 40 characters
 * @property {string} [updatedAt]               - Updated at
 * @property {string} [attendanceBy]            - Attendance by, user who registered the attendance
 * @property {boolean} [isSmallPool]            - Is small pool
 * @property {string} [extraLessonReasonId]     - Extra lesson reason id, min 1
 * @property {number} [courseId]                - Course id, min 1
 * @property {Student.Level} [level]            - Level
 */

class LessonModel {
    /**
     * Lesson id (studentScheduleId), min 1
     * @type {number}
     */
    studentScheduleId;

    /**
     * Sale detail id, min 1
     * @type {number}
     */
    saleDetailId;

    /**
     * Student id, min 1
     * @type {number}
     */
    studentId;

    /**
     * Init, date string
     * @type {string}
     */
    init;

    /**
     * End, date string
     * @type {string}
     */
    end;

    /**
     * State
     * @type {LessonState}
     */
    state;

    /**
     * Attendance time
     * @type {string|undefined}
     */
    attendanceTime;

    /**
     * Pool id (sucursal)
     * @type {number}
     */
    poolId;

    /**
     * Updated by, max 40 characters
     * @type {string|undefined}
     */
    updatedBy;

    /**
     * Updated at
     * @type {string|undefined}
     */
    updatedAt;

    /**
     * Attendance by, user who registered the attendance
     * @type {string|undefined}
     */
    attendanceBy;

    /**
     * Is small pool
     * @type {boolean|undefined}
     */
    isSmallPool;

    /**
     * Extra lesson reason id, min 1
     * @type {string|undefined}
     */
    extraLessonReasonId;

    /**
     * Course id, min 1
     * @type {number|undefined}
     */
    courseId;

    /**
     * Level
     * @type {Student.Level|undefined}
     */
    level;

    /**
     * Creates a lesson model
     * @param {Lesson} lesson - Lesson
     * @returns {LessonModel}
     */
    static fromLesson = (lesson) => {
        return modelFromObject(lesson, LessonModel);
    };
}

module.exports = { LessonModel, States };
