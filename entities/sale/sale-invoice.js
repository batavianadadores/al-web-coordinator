const { modelFromObject } = require("../utils");

/**
 * @typedef InvoiceType
 * @type {('B'|'F'|'R')}
 */

const InvoiceTypes = Object.freeze({
    all: ["B", "F", "R", "N"],
    B: {
        key: "B",
        description: "Boleta",
    },
    F: {
        key: "F",
        description: "Factura",
    },
    R: {
        key: "R",
        description: "Recibo",
    },
    N: {
        key: "N",
        description: "Nota de crédito",
    },
});

/**
 * @typedef {object} SaleInvoice
 * @property {number} saleInvoiceId - Sale invoice id, min 1
 * @property {number} saleId - Sale id, min 1
 * @property {string} eiIdType - Electronic Invoice Id Type, either RUC or DNI
 * @property {string} eiIdNumber - Electronic Invoice Id Number, max 16 characters
 * @property {string} eiNames - Electronic Invoice Names
 * @property {string} [eiFatherFamilyName] - Electronic Invoice Father Family Name
 * @property {string} [eiMotherFamilyName] - Electronic Invoice Mother Family Name
 * @property {string} [eiAddress] - Electronic Invoice Address, max 100 characters
 * @property {string} eiEmail - Electronic Invoice Email
 * @property {InvoiceType} [iType] - Invoice Type, either B, F or R
 * @property {string} iState - Invoice State, either done, error or pending
 * @property {string} iAction - Invoice Action, either emit or cancel
 * @property {number} [issuerId] - Issuer Id, min 1
 * @property {number} [iNumber] - Invoice Number, min 1
 * @property {number} [iSerie] - Invoice Serie, min 1
 * @property {string} [billId] - Bill Id
 * @property {string} [eiLink] - Electronic Invoice Link
 * @property {Date} createdOn - Created on
 * @property {Date} [updatedOn] - Update on
 * @property {Date} [dateOfIssue] - Date of issue
 * @property {string} totalAmount - Total Amount, numeric string
 * @property {number} [sucursal] - Sucursal Id, min 1
 */

class SaleInvoiceModel {
    /**
     * Sale invoice id, min 1
     * @type {number}
     */
    saleInvoiceId;

    /**
     * Sale Id, min 1
     * @type {number}
     */
    saleId;

    /**
     * Electronic Invoice Id Type, either RUC or DNI
     * @type {string}
     */
    eiIdType;

    /**
     * Electronic Invoice Id Number, max 16 characters
     * @type {string}
     */
    eiIdNumber;

    /**
     * Electronic Invoice Names
     * @type {string}
     */
    eiNames;

    /**
     * Electronic Invoice Father Family Name
     * @type {string|undefined}
     */
    eiFatherFamilyName;

    /**
     * Electronic Invoice Mother Family Name
     * @type {string|undefined}
     */
    eiMotherFamilyName;

    /**
     * Electronic Invoice Address, max 100 characters
     * @type {string|undefined}
     */
    eiAddress;

    /**
     * Electronic Invoice Email
     * @type {string}
     */
    eiEmail;

    /**
     * Invoice Type, either B, F or R
     * @type {InvoiceType|undefined}
     */
    iType;

    /**
     * Invoice State, either done, error or pending
     * @type {string}
     */
    iState;

    /**
     * Invoice Action, either emit or cancel
     * @type {string}
     */
    iAction;

    /**
     * Issuer Id, min 1
     * @type {number|undefined}
     */
    issuerId;

    /**
     * Invoice Number, min 1
     * @type {number|undefined}
     */
    iNumber;

    /**
     * Invoice Serie, min 1
     * @type {number|undefined}
     */
    iSerie;

    /**
     * Bill Id
     * @type {string|undefined}
     */
    billId;

    /**
     * Electronic Invoice Link
     * @type {string|undefined}
     */
    eiLink;

    /**
     * Created on
     * @type {string}
     */
    createdOn;

    /**
     * Update on
     * @type {string}
     */
    updatedOn;

    /**
     * Date of issue
     * @type {string}
     */
    dateOfIssue;

    /**
     * Total Amount, numeric string
     * @type {string}
     */
    totalAmount;

    /**
     * Sucursal Id, min 1
     * @type {number|undefined}
     */
    sucursal;

    /**
     * Creates a SaleModel
     * @param {SaleInvoice} saleInvoice - Sale object
     * @returns {SaleInvoiceModel}
     */
    static fromSaleInvoice(saleInvoice) {
        return modelFromObject(saleInvoice, SaleInvoiceModel);
    }
}

module.exports = { SaleInvoiceModel, InvoiceTypes };
