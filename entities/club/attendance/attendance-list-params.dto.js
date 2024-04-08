const { modelFromObject } = require("../../utils");
const PaginationDtoModel = require("../../common/pagination.dto");
const {
    validateInteger,
    isUndefinedOrNull,
    validateDateString,
    validateStringBoolean,
} = require("../../validators");
const { DateTime } = require("luxon");

/**
 * @typedef {object} AttendanceListParamsDto
 * @property {string} startDate - Start date
 * @property {string} endDate - End date
 * @property {number} poolId - Pool id
 * @property {boolean} isPreTeam - Is pre team
 */

class AttendanceListParamsDtoModel {
    /**
     * Start date
     * @type {string}
     */
    startDate;

    /**
     * End date
     * @type {string}
     */
    endDate;

    /**
     * Pool id
     * @type {number}
     */
    poolId;

    /**
     * Is Pre team
     * @type {boolean}
     */
    isPreTeam;

    /**
     * Creates dto model from dto
     * @param {AttendanceListParamsDto} object - Object
     * @returns {AttendanceListParamsDtoModel}
     */
    static fromDto = (object) => {
        return modelFromObject(object, this);
    };

    /**
     * Validate a property of the object, or all if not parameter is passed.
     * Throws a validation error in case validation fails
     * @param {string|undefined} property - Property to validate
     * @returns {void}
     */
    validate(property) {
        if (isUndefinedOrNull(property)) {
            for (const key in this) {
                if (Object.hasOwnProperty.call(this, key)) {
                    this.validate(key);
                }

                const startDateTime = DateTime.fromISO(this.startDate);
                const endDateTime = DateTime.fromISO(this.endDate);

                /// check that start date is before end date and do not allow more than 90 days
                if (startDateTime.toMillis() > endDateTime.toMillis()) {
                    throw new Error(
                        "La fecha de inicio no puede ser mayor que la fecha de fin"
                    );
                }

                if (endDateTime.diff(startDateTime, "days").days > 90) {
                    throw new Error(
                        "El rango de fechas no puede ser mayor a 90 días"
                    );
                }
            }
            return;
        }

        switch (property) {
            case "startDate":
                this.startDate = validateDateString(
                    this.startDate,
                    "startDate",
                    "la fecha de inicio"
                );
                break;
            case "endDate":
                this.endDate = validateDateString(
                    this.endDate,
                    "endDate",
                    "la fecha de fin"
                );
                break;
            case "poolId":
                this.poolId = validateInteger(
                    this.poolId,
                    "poolId",
                    "el id de la piscina",
                    { min: 1 }
                );
                break;
            case "isPreTeam":
                this.isPreTeam = validateStringBoolean(
                    this.isPreTeam,
                    "isPreTeam",
                    "es pre equipo"
                );
                break;
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = { AttendanceListParamsDtoModel };
