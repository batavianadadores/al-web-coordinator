const { modelFromObject } = require("../../utils");
const {
    validateInteger,
    isUndefinedOrNull,
    validateDateString,
} = require("../../validators");

/**
 * @typedef {object} PaymentAddParamsDto
 * @property {number} memberId    - Member id, min 1.
 * @property {number} [productId] - Product id, min 1.
 * @property {string} [dueDate]   - Due date, date string.
 */

class PaymentAddParamsDtoModel {
    /**
     * Member id, min 1
     * @type {number}
     */
    memberId;

    /**
     * Product id, min 1
     * @type {number|undefined}
     */
    productId;

    /**
     * Due date, date string
     * @type {string|undefined}
     */
    dueDate;

    /**
     * Creates model
     * @param {PaymentAddParamsDto} dto - Dto
     * @returns {PaymentAddParamsDtoModel}
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
            case "memberId":
                this.memberId = validateInteger(
                    this.memberId,
                    "memberId",
                    "id del miembro",
                    {
                        min: 1,
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
                        optional: true,
                    }
                );
                break;
            case "dueDate":
                this.dueDate = validateDateString(
                    this.dueDate,
                    "dueDate",
                    "fecha de vencimiento",
                    { optional: true }
                );
                break;
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = { PaymentAddParamsDtoModel };
