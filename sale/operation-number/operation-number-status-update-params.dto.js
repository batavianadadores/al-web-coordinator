const { modelFromObject } = require("../../utils");
const { ValidationError } = require("../../common/validation.error");
const {
    isUndefinedOrNull,
    isUndefined,
    validateInteger,
} = require("../../validators");

/**
 * @typedef {object} OperationNumberStatusUpdateParamsDto
 * @property {number} salePaymentId   - Sale payment id, min 1.
 * @property {number} newStatusId      - New status id, min 1.
 */

class OperationNumberStatusUpdateParamsDtoModel {
    /**
     * Sale payment id, min 1
     * @type {number}
     */
    salePaymentId;

    /**
     * New status id, min 1
     *@type {number}
     */
    newStatusId;

    /**
     * Creates model
     * @param {OperationNumberStatusUpdateParamsDto} dto - Dto
     * @returns {OperationNumberStatusUpdateParamsDtoModel}
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

            if (
                isUndefined(this.newStatusId) ||
                isUndefined(this.salePaymentId)
            ) {
                throw ValidationError.NoValuesToUpdate();
            }

            return;
        }

        switch (property) {
            case "salePaymentId":
                this.salePaymentId = validateInteger(
                    this.salePaymentId,
                    "salePaymentId",
                    "id del pago de venta",
                    {
                        min: 1,
                    }
                );
                break;
            case "newStatusId":
                this.newStatusId = validateInteger(
                    this.newStatusId,
                    "newStatusId",
                    "nuevo id de estado",
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

module.exports = { OperationNumberStatusUpdateParamsDtoModel };
