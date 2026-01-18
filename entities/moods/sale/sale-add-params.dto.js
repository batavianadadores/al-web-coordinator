const { modelFromObject } = require("../../utils");
const { ValidationError } = require("../../common/validation.error");
const {
    isUndefinedOrNull,
    validateString,
    validateConstant,
    isEmail,
    validateInteger,
    validateArray,
} = require("../../validators");
const Sale = require("./sale");

/**
 * @typedef {object} SaleAddParamsDto
 * @property {Sale.SaleItem[]} items        - Sale items
 * @property {Sale.SaleInvoiceData} invoiceData  - Sale invoice data
 * @property {Sale.InvoiceType} invoiceType  - Sale invoice type
 * @property {number} poolId - Pool Id
 */

class SaleAddParamsDtoModel {
    /**
     * Sale items
     * @type {Sale.SaleItem[]}
     */
    items;

    /**
     * Sale invoice data
     * @type {Sale.SaleInvoiceData}
     */
    invoiceData;

    /**
     * Sale invoice type
     * @type {Sale.InvoiceType}
     */
    invoiceType;

    /**
     * PoolId
     * @type {number}
     */
    poolId;

    /**
     * Creates model
     * @param {SaleAddParamsDto} dto - Dto
     * @returns {SaleAddParamsDtoModel}
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
            case "items":
                this.items = validateArray(
                    this.items,
                    "items",
                    "items de la venta",
                    {
                        canBeEmpty: false,
                    }
                );

                for (const item of this.items) {
                    validateInteger(item.stockId, "stockId", "id del stock", {
                        min: 1,
                    });
                    validateInteger(
                        item.quantity,
                        "quantity",
                        "cantidad del producto",
                        {
                            min: 1,
                        }
                    );
                }
                break;
            case "invoiceData":
                if (
                    !isUndefinedOrNull(this.invoiceData.name) &&
                    this.invoiceData.name.trim() !== ""
                ) {
                    validateString(
                        this.invoiceData.name,
                        "name",
                        "nombre o razón social del cliente",
                        {
                            min: 1,
                            optional: true,
                        }
                    );
                }
                if (
                    !isUndefinedOrNull(this.invoiceData.email) &&
                    !isEmail(this.invoiceData.email)
                ) {
                    const message = `The parameter: email is not a valid email`;
                    const userMessage = `El correo electrónico no es un valor válido`;
                    throw new ValidationError(message, userMessage);
                }
                this.validate("invoiceType");
                if (this.invoiceType === "F") {
                    validateString(
                        this.invoiceData.idNumber,
                        "idNumber",
                        "número de ruc del cliente",
                        {
                            regex: /^[0-9]{11}$/,
                            regexExplanation: "11 dígitos",
                        }
                    );
                    validateString(
                        this.invoiceData.address,
                        "address",
                        "dirección del cliente",
                        {
                            min: 1,
                        }
                    );
                }
                if (this.invoiceType === "B") {
                    validateString(
                        this.invoiceData.idNumber,
                        "idNumber",
                        "número de documento del cliente",
                        {
                            regex: /^[0-9]{8}$/,
                            regexExplanation: "8 dígitos",
                            optional: true,
                        }
                    );
                }
                break;
            case "invoiceType":
                this.invoiceType = validateConstant(
                    this.invoiceType,
                    ["B", "F"],
                    "invoiceType",
                    "tipo de comprobante",
                    "B: Boleta, F: Factura",
                    "B: Boleta, F: Factura"
                );
                break;
            case "poolId":
                this.poolId = validateInteger(
                    this.poolId,
                    "poolId",
                    "id de la piscina",
                    {
                        min: 0,
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

module.exports = { SaleAddParamsDtoModel };
