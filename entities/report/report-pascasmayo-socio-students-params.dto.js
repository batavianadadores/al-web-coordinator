const { modelFromObject } = require("../utils");
const { isUndefinedOrNull, validateInteger } = require("../validators");

/**
 * @typedef {Object} ReportPascamayoSocioStudentsDto
 * @property {number} year - Year
 * @property {number} month - Month
 */

class ReportPascamayoSocioStudentsDtoModel {
    /**
     * Year
     * @type {number}
     */
    year;

    /**
     * Year
     * @type {number}
     */
    month;

    /**
     * Creates dto model from dto
     * @param {ReportPascamayoSocioStudentsDto} object - Object
     * @returns {ReportPascamayoSocioStudentsDtoModel}
     */
    static fromDto = (object) => {
        return modelFromObject(object, this);
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
            case "year":
                this.year = validateInteger(this.year, "year", "año", {
                    min: 2000,
                });
                break;
            case "month":
                this.month = validateInteger(this.month, "month", "mes", {
                    min: 1,
                    max: 12,
                });
                break;
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = { ReportPascamayoSocioStudentsDtoModel };
