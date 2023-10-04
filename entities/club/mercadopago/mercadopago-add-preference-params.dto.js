const { ValidationError } = require("../../common/validation.error");
const { modelFromObject } = require("../../utils");
const {
    validateInteger,
    isUndefinedOrNull,
    validateArray,
} = require("../../validators");

/**
 * @typedef {object} MercadopagoAddPreferenceParamsDto
 * @property {number[]} paymentIds - Payment ids
 */

class MercadopagoAddPreferenceParamsDtoModel {
    /**
     * Payment ids
     * @type {number[]}
     */
    paymentIds;

    /**
     * Creates model
     * @param {MercadopagoAddPreferenceParamsDto} dto - Dto
     * @returns {MercadopagoAddPreferenceParamsDtoModel}
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
            case "paymentIds":
                this.paymentIds = validateArray(
                    this.paymentIds,
                    "paymentIds",
                    "el id de los pagos"
                );
                if (this.paymentIds.length === 0) {
                    throw new ValidationError(
                        "paymentIds must contain at least one element",
                        "Debes indicar al menos un pago"
                    );
                }
                this.paymentIds.forEach((paymentId) => {
                    validateInteger(paymentId, "paymentId", "el id del pago", {
                        min: 1,
                    });
                });
                break;
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = {
    MercadopagoAddPreferenceParamsDtoModel,
};
