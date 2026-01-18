const { Types } = require("../sale-payment");
const SalePayment = require("../sale-payment");
const { modelFromObject } = require("../../utils");
const {
    isUndefinedOrNull,
    validateString,
    validateConstant,
    validateDecimal,
    validateInteger,
} = require("../../validators");

/**
 * @typedef {object} OperationNumberAddParamsDto
 * @property {SalePayment.Type} paymentType - Payment type
 * @property {string} amount - Amount
 * @property {string} operationNumber - Operation number
 * @property {number} operationNumberStatusId - Operation number status id
 */

class OperationNumberAddParamsDtoModel {
    /**
     * Payment type
     * @type {string}
     * @type {SalePayment.Type}
     */
    paymentType;

    /**
     * Amount
     * @type {string}
     */
    amount;

    /**
     * Operation number
     * @type {string}
     */
    operationNumber;

    /**
     * Operation number status id
     * @type {number}
     */
    operationNumberStatusId;

    /**
     * Creates model
     * @param {OperationNumberAddParamsDto} dto - Dto
     * @returns {OperationNumberAddParamsDtoModel}
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
            case "paymentType":
                this.paymentType = validateConstant(
                    this.paymentType,
                    Types.all,
                    "paymentType",
                    "Tipo de pago",
                    "SalePayment.Type",
                    "Tipos de pago"
                );
                break;
            case "amount":
                this.amount = validateDecimal(this.amount, "amount", "Monto");
                break;
            case "operationNumber":
                this.operationNumber = validateString(
                    this.operationNumber,
                    "operationNumber",
                    "número de operación",
                    {
                        min: 1,
                        optional: false,
                    }
                );
                break;
            case "operationNumberStatusId":
                this.operationNumberStatusId = validateInteger(
                    this.operationNumberStatusId,
                    "operationNumberStatusId",
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

module.exports = { OperationNumberAddParamsDtoModel };
