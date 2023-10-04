const { modelFromObject } = require("../../utils");
const Payment = require("../payment/payment");

/**
 * @typedef {Object} Attendance
 * @property {number} attendanceId - Attendance Id
 * @property {number} memberId - Member Id
 * @property {number} poolId - Pool Id
 * @property {string} createdBy - Created By
 * @property {Date} createdAt - Created At
 * @property {string} updatedBy - Updated By
 * @property {Date} updatedAt - Updated At
 */

class AttendanceModel {
    /**
     * Attendance Id
     * @type {number}
     */
    attendanceId;

    /**
     * Member Id
     * @type {number}
     */
    memberId;

    /**
     * Pool Id
     * @type {number}
     */
    poolId;

    /**
     * Created By
     * @type {string}
     */
    createdBy;

    /**
     * Created At
     * @type {Date}
     */
    createdAt;

    /**
     * Updated By
     * @type {string}
     */
    updatedBy;

    /**
     * Updated At
     * @type {Date}
     */
    updatedAt;

    /**
     * Creates a model
     * @param {Attendance} attendance - Attendance
     * @returns {AttendanceModel}
     */
    static fromMember = (attendance) => {
        return modelFromObject(attendance, AttendanceModel);
    };
}

module.exports = { AttendanceModel };
