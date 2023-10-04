const { modelFromObject } = require("../../utils");
const SalePayment = require("../../sale/sale-payment");
const { ValidationError } = require("../../common/validation.error");
const {
    isUndefinedOrNull,
    validateInteger,
    isUndefined,
    validateConstant,
    validateArray,
    validateDecimal,
} = require("../../validators");

/**
 * @typedef {object} PaymentAddSaleParamsDto
 * @property {number} paymentId         - Payment id, min 1.
 * @property {number} sucursal          - Sucursal id, min 1.
 * @property {SalePayment.SalePayment[]} payments   - Payments
 */

class PaymentAddSaleParamsDtoModel {
    /**
     * Payment id
     * @type {number}
     */
    paymentId;

    /**
     * Sucursal id
     * @type {number}
     */
    sucursal;

    /**
     * Payments
     * @type {SalePayment.SalePayment[]}
     */
    payments;

    /**
     * Creates model
     * @param {PaymentAddSaleParamsDto} dto - Dto
     * @returns {PaymentAddSaleParamsDtoModel}
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
            case "sucursal":
                this.sucursal = validateInteger(
                    this.sucursal,
                    "state",
                    "la piscina",
                    {
                        min: 1,
                    }
                );
                break;
            case "payments":
                this.payments = validateArray(
                    this.payments,
                    "payments",
                    "los pagos"
                );

                for (let i = 0; i < this.payments.length; i++) {
                    const payment = this.payments[i];

                    validateConstant(
                        payment.type,
                        SalePayment.Types.all,
                        `type at position: ${i}`,
                        `el tipo de pago en la posición: ${i + 1}`,
                        "SalePayment.Types.all",
                        "Tipos de pago"
                    );

                    validateDecimal(
                        payment.amount,
                        "amount at position: ${i}",
                        "el monto en la posición: ${i + 1}"
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

module.exports = { PaymentAddSaleParamsDtoModel };
