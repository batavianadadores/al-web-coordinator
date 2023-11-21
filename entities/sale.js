const { modelFromObject } = require("./utils");

/**
 * @typedef {object} Sale
 * @property {number} saleId - Sale Id, min 1
 * @property {string} totalAmount - Total Amount, numeric string
 * @property {string} [partialPayment] - Partial Payment, numeric string, deprecated kept for compatibility
 * @property {string} date - Date, string date
 * @property {string} [debt] - Debt, numeric string, deprecated kept for compatibility
 * @property {string} [webId] - Web Id, refers to mercadopago id
 * @property {boolean} [isElectronicInvoice] - Is Electronic Invoice, deprecated kept for compatibility
 * @property {number} [seller] - Seller Id, deprecated use soldBy instead
 * @property {string} [soldBy] - Sold By, max 40 characters
 * @property {string} [referenceCode] - Reference Code, max 20 characters
 * @property {number} [sucursal] - Sucursal Id, min 1
 * @property {string} type - Type, sale or refund
 * @property {number} [refundSaleId] - Refund sale id
 * @property {string} [refundReason] - Refund reason
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
     * Seller Id, deprecated use soldBy instead
     * @type {number|undefined}
     * @deprecated
     */
    seller;

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
     * Type, sale or refund
     * @type {string}
     */
    type;

    /**
     * Refund sale id
     * @type {number|undefined}
     */
    refundSaleId;

    /**
     * Refund reason
     * @type {string|undefined}
     */
    refundReason;

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
