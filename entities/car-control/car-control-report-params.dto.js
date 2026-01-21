const { DateTime } = require("luxon");
const { modelFromObject } = require("../utils");
const { isUndefinedOrNull, validateISODateString } = require("../validators");
const { ValidationError } = require("../common/validation.error");

/**
 * @typedef {object} CarControlReportParamsDto
 * @property {string} day  - Day
 */

class CarControlReportParamsDtoModel {
    /**
     * Day
     * @type {string}
     */
    day;

    /**
     * Creates model
     * @param {CarControlReportParamsDto} dto - Dto
     * @returns {CarControlReportParamsDtoModel}
     */
    static fromDto = (dto) => {
        return modelFromObject(dto, this);
    };

    /**
     * Validate a property of the object, or all if not parameter is passed.
     * Throws a validation error in case validation fails
     * @param {string} [property] - Property to validate
     * @returns {void}
     */
    validate(property) {
        if (isUndefinedOrNull(property)) {
            for (const key in this) {
                if (Object.hasOwnProperty.call(this, key)) {
                    this.validate(key);
                }
            }
            return;
        }

        switch (property) {
            case "day":
                this.day = validateISODateString(this.day, "day", "el día");
                // Date is max 3 months in the past
                const date = DateTime.fromISO(this.day);
                if (date < DateTime.now().minus({ months: 3 })) {
                    throw ValidationError.Incorrect(
                        "day",
                        "el día",
                        "date < 3 months ago",
                        "no puede ser más de 3 meses en el pasado"
                    );
                }
                break;
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = { CarControlReportParamsDtoModel };
