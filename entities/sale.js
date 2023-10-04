const { modelFromObject } = require("./utils");

/**
 * @typedef {object} Sale
 * @property {number} saleId - Sale Id, min 1
 * @property {string} totalAmount - Total Amount, numeric string
 * @property {string} [billId] - Bill Id
 * @property {string} [partialPayment] - Partial Payment, numeric string, deprecated kept for compatibility
 * @property {string} date - Date, string date
 * @property {string} [debt] - Debt, numeric string, deprecated kept for compatibility
 * @property {string} [webId] - Web Id, refers to mercadopago id
 * @property {boolean} [isElectronicInvoice] - Is Electronic Invoice, deprecated kept for compatibility
 * @property {string} [eiIdType] - Electronic Invoice Id Type, either RUC or DNI
 * @property {string} [eiIdNumber] - Electronic Invoice Id Number, max 16 characters
 * @property {string} [eiNames] - Electronic Invoice Names
 * @property {string} [eiFatherFamilyName] - Electronic Invoice Father Family Name
 * @property {string} [eiMotherFamilyName] - Electronic Invoice Mother Family Name
 * @property {string} [eiEmail] - Electronic Invoice Email
 * @property {number} [seller] - Seller Id, deprecated use soldBy instead
 * @property {string} [eiLink] - Electronic Invoice Link
 * @property {string} [paymentType] - Payment Type
 * @property {string} [soldBy] - Sold By, max 40 characters
 * @property {string} [referenceCode] - Reference Code, max 20 characters
 * @property {number} [sucursal] - Sucursal Id, min 1
 * @property {string} [iType] - Invoice Type, either B, F or R
 * @property {string} [iState] - Invoice State, either done, error or pending
 * @property {string} [iAction] - Invoice Action, either emit or cancel
 * @property {number} [issuerId] - Issuer Id, min 1
 * @property {number} [iNumber] - Invoice Number, min 1
 * @property {number} [iSerie] - Invoice Serie, min 1
 * @property {string} [eiAddress] - Electronic Invoice Address, max 100 characters
 */

class SaleModel {
    /**
     * Sale Id, min 1
     * @type {number}
     */
    saleId;

    /**
     * Total Amount, numeric string
     * @type {string}
     */
    totalAmount;

    /**
     * Bill Id
     * @type {string|undefined}
     */
    billId;

    /**
     * Partial Payment, numeric string, deprecated kept for compatibility
     * @type {string|undefined}
     * @deprecated
     */
    partialPayment;

    /**
     * Date, string date
     * @type {string}
     */
    date;

    /**
     * Debt, numeric string, deprecated kept for compatibility
     * @type {string|undefined}
     * @deprecated
     */
    debt;

    /**
     * Web Id, refers to mercadopago id
     * @type {string|undefined}
     */
    webId;

    /**
     * Is Electronic Invoice, deprecated kept for compatibility
     * @type {boolean|undefined}
     * @deprecated
     */
    isElectronicInvoice;

    /**
     * Electronic Invoice Id Type, either RUC or DNI
     * @type {string|undefined}
     */
    eiIdType;

    /**
     * Electronic Invoice Id Number, max 16 characters
     * @type {string|undefined}
     */
    eiIdNumber;

    /**
     * Electronic Invoice Names
     * @type {string|undefined}
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
     * Electronic Invoice Email
     * @type {string|undefined}
     */
    eiEmail;

    /**
     * Seller Id, deprecated use soldBy instead
     * @type {number|undefined}
     * @deprecated
     */
    seller;

    /**
     * Electronic Invoice Link
     * @type {string|undefined}
     */
    eiLink;

    /**
     * Payment Type
     * @type {string|undefined}
     */
    paymentType;

    /**
     * Sold By, max 40 characters
     * @type {string|undefined}
     */
    soldBy;

    /**
     * Reference Code, max 20 characters
     * @type {string|undefined}
     */
    referenceCode;

    /**
     * Sucursal Id, min 1
     * @type {number|undefined}
     */
    sucursal;

    /**
     * Invoice Type, either B, F or R
     * @type {string|undefined}
     */
    iType;

    /**
     * Invoice State, either done, error or pending
     * @type {string|undefined}
     */
    iState;

    /**
     * Invoice Action, either emit or cancel
     * @type {string|undefined}
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
     * Electronic Invoice Address, max 100 characters
     * @type {string|undefined}
     */
    eiAddress;

    /**
     * Creates a SaleModel
     * @param {Sale} sale - Sale object
     * @returns {SaleModel}
     */
    static fromSale(sale) {
        return modelFromObject(sale, SaleModel);
    }
}

module.exports = { SaleModel };
