const Student = require("../student/student");
const { modelFromObject } = require("../utils");
const SaleInvoice = require("../sale/sale-invoice");
const { validateEmail } = require("../../components/common/validators");
const {
    isUndefinedOrNull,
    validateInteger,
    validateString,
    validateCommaSeparatedConstant,
} = require("../validators");

/**
 * @typedef {object} SaleDetailChangeInvoiceDataParamsDto
 * @property {number} saleDetailId - Sale detail id
 * @property {SaleInvoice.InvoiceType} newInvoiceType - New invoice type
 * @property {string} newIdType - New id type
 * @property {string} newIdNumber - New id number
 * @property {string} newNames - New names
 * @property {string} newFatherFamilyName - New father family name
 * @property {string} newMotherFamilyName - New mother family name
 * @property {string} newAddress - New address
 * @property {string} newEmail - New email
 * @property {string} reason - Reason
 */

class SaleDetailChangeInvoiceDataParamsDtoModel {
    /**
     * Sale detail id, min 1
     * @type {number}
     */
    saleDetailId;

    /**
     * New invoice type
     * @type {SaleInvoice.InvoiceType}
     */
    newInvoiceType;

    /**
     * New id type
     * @type {string}
     */
    newIdType;

    /**
     * New id number
     * @type {string}
     */
    newIdNumber;

    /**
     * New names
     * @type {string}
     */
    newNames;

    /**
     * New father family name
     * @type {string}
     */
    newFatherFamilyName;

    /**
     * New mother family name
     * @type {string}
     */
    newMotherFamilyName;

    /**
     * New address
     * @type {string}
     */
    newAddress;

    /**
     * New email
     * @type {string}
     */
    newEmail;

    /**
     * Reason
     * @type {string}
     */
    reason;

    /**
     * Creates a model from dto
     * @param {SaleDetailChangeInvoiceDataParamsDto} dto - Dto
     * @returns {SaleDetailChangeInvoiceDataParamsDtoModel}
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
                    "id del detalle de la venta",
                    {
                        min: 1,
                    }
                );
                break;
            case "newInvoiceType":
                this.newInvoiceType = validateCommaSeparatedConstant(
                    this.newInvoiceType,
                    SaleInvoice.InvoiceTypes.all,
                    "newInvoiceType",
                    "tipo de factura",
                    "SaleInvoice.InvoiceTypes",
                    "los tipos de factura"
                );
                break;
            case "newIdType":
                this.newIdType = validateCommaSeparatedConstant(
                    this.newIdType,
                    Student.IdTypes.all,
                    "newIdType",
                    "tipo de documento",
                    "SaleInvoice.IdTypes",
                    "los tipos de documento"
                );
                break;
            case "newIdNumber":
                this.newIdNumber = validateString(
                    this.newIdNumber,
                    "newIdNumber",
                    "el número de documento",
                    {
                        regex: /^[a-zA-Z0-9]{8,15}$/,
                    }
                );
                break;
            case "newNames":
                this.newNames = validateString(
                    this.newNames,
                    "newNames",
                    "los nombres"
                );
                break;
            case "newFatherFamilyName":
                this.newFatherFamilyName = validateString(
                    this.newFatherFamilyName,
                    "newFatherFamilyName",
                    "el apellido paterno",
                    {
                        optional: true,
                    }
                );
                break;
            case "newMotherFamilyName":
                this.newMotherFamilyName = validateString(
                    this.newMotherFamilyName,
                    "newMotherFamilyName",
                    "el apellido paterno",
                    {
                        optional: true,
                    }
                );
                break;
            case "newAddress":
                this.newAddress = validateString(
                    this.newAddress,
                    "newAddress",
                    "el apellido paterno",
                    {
                        optional: true,
                    }
                );
                break;
            case "newEmail":
                this.newEmail = validateEmail(
                    this.newEmail,
                    "newEmail",
                    "el email"
                );
                break;
            case "reason":
                this.reason = validateString(
                    this.reason,
                    "reason",
                    "la razón",
                    {
                        optional: true,
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
    SaleDetailChangeInvoiceDataParamsDtoModel,
};
