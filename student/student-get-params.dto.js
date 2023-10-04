const { modelFromObject } = require("../utils");
const { isUndefinedOrNull, validateInteger } = require("../validators");

/**
 * @typedef {object} StudentGetParamsDto
 * @property {number} studentId - Student id, min 1.
 */

class StudentGetParamsDtoModel {
    /**
     * Student id, min 1
     * @type {number}
     */
    studentId;

    /**
     * Creates a model from dto
     * @param {StudentGetParamsDto} dto - Dto
     * @returns {StudentGetParamsDtoModel}
     */
    static fromDto = (dto) => {
        return modelFromObject(dto, this);
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
            }
            return;
        }

        switch (property) {
            case "studentId":
                this.studentId = validateInteger(
                    this.studentId,
                    "studentId",
                    "id del alumno",
                    {
                        min: 1,
                    }
                );
                break;
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = { StudentGetParamsDtoModel };
