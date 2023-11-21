const { modelFromObject } = require("../utils");
const {
    isUndefinedOrNull,
    validateInteger,
    validateDecimal,
    validateString,
} = require("../validators");

/**
 * @typedef {object} SaleDetailRefundPartialParamsDto
 * @property {number} saleDetailId - Sale detail id, min 1.
 * @property {string} amount - Amount to refund.
 * @property {string} reason - Reason for the refund.
 */

class SaleDetailRefundPartialParamsDtoModel {
    /**
     * Sale detail id, min 1
     * @type {number}
     */
    saleDetailId = undefined;

    /**
     * Amount to refund
     * @type {string}
     */
    amount = undefined;

    /**
     * Reason for the refund
     * @type {string}
     */
    reason = undefined;

    /**
     * Creates a model from dto
     * @param {SaleDetailRefundPartialParamsDto} dto - Dto
     * @returns {SaleDetailRefundPartialParamsDtoModel}
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
            case "saleDetailId":
                this.saleDetailId = validateInteger(
                    this.saleDetailId,
                    "saleDetailId",
                    "el id del detalle de la venta",
                    {
                        min: 1,
                    }
                );
                break;
            case "amount":
                this.amount = validateDecimal(
                    this.amount,
                    "amount",
                    "el monto a devolver"
                );
                break;
            case "reason":
                this.reason = validateString(
                    this.reason,
                    "reason",
                    "el motivo de la devolución",
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

module.exports = {
    SaleDetailRefundPartialParamsDtoModel,
};
