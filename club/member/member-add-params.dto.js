const { modelFromObject } = require("../../utils");
const { isUndefinedOrNull, validateInteger } = require("../../validators");

/**
 * @typedef {object} MemberAddParamsDto
 * @property {number} studentId - Student id
 * @property {number} dueDay    - Due day, min 1, max 31
 * @property {number} productId - Product id
 */

class MemberAddParamsDtoModel {
    /**
     * Student id
     * @type {number}
     */
    studentId;

    /**
     * Due day, min 1, max 31
     * @type {number}
     */
    dueDay;

    /**
     * Product id
     * @type {number}
     */
    productId;

    /**
     * Creates model
     * @param {MemberAddParamsDto} dto - Dto
     * @returns {MemberAddParamsDtoModel}
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
            case "studentId":
                this.studentId = validateInteger(
                    this.studentId,
                    "studentId",
                    "id del estudiante",
                    {
                        min: 1,
                    }
                );
                break;
            case "dueDay":
                this.dueDay = validateInteger(
                    this.dueDay,
                    "dueDay",
                    "dia de pago",
                    {
                        min: 1,
                        max: 31,
                    }
                );
                break;
            case "productId":
                this.productId = validateInteger(
                    this.productId,
                    "productId",
                    "id del producto",
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

module.exports = { MemberAddParamsDtoModel };
