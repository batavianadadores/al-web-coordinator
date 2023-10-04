const Payment = require("./payment");
const { modelFromObject } = require("../../utils");
const { ValidationError } = require("../../common/validation.error");
const {
    isUndefinedOrNull,
    validateInteger,
    isUndefined,
    validateConstant,
} = require("../../validators");

/**
 * @typedef {object} PaymentUpdateParamsDto
 * @property {number} paymentId         - Payment id, min 1.
 * @property {Payment.State} [state]    - State
 */

class PaymentUpdateParamsDtoModel {
    /**
     * Payment id
     * @type {number}
     */
    paymentId;

    /**
     * State
     * @type {Payment.State|undefined}
     */
    state;

    /**
     * Creates model
     * @param {PaymentUpdateParamsDto} dto - Dto
     * @returns {PaymentUpdateParamsDtoModel}
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

            if (isUndefined(this.state)) {
                throw ValidationError.NoValuesToUpdate();
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
            case "state":
                if (!isUndefined(this.state)) {
                    this.state = validateConstant(
                        this.state,
                        Payment.States.all,
                        "state",
                        "estado",
                        "Payment.States.all",
                        "Estados del pago"
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

module.exports = { PaymentUpdateParamsDtoModel };
