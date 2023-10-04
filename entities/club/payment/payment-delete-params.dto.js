const { modelFromObject } = require("../../utils");
const { isUndefinedOrNull, validateInteger } = require("../../validators");

/**
 * @typedef {object} PaymentDeleteParamsDto
 * @property {number} paymentId - Payment id, min 1.
 */

class PaymentDeleteParamsDtoModel {
    /**
     * Payment id, min 1
     * @type {number}
     */
    paymentId;

    /**
     * Creates a model from dto
     * @param {PaymentDeleteParamsDto} dto - Dto
     * @returns {PaymentDeleteParamsDtoModel}
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
            case "paymentId":
                this.paymentId = validateInteger(
                    this.paymentId,
                    "paymentId",
                    "id del pago",
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

module.exports = { PaymentDeleteParamsDtoModel };
