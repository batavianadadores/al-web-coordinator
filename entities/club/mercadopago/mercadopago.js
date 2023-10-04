/**
 * @typedef {object} Mercadopago
 * @property {number} mercadopagoId     - Mercadopago id
 * @property {object} body              - Body
 * @property {string} [preferenceId]    - Preference id
 * @property {string} state             - State
 * @property {string} [merchantOrderId] - Merchant order id
 * @property {object} [merchantOrder]   - Merchant order
 * @property {string} createdBy         - Created by
 * @property {string} createdAt         - Created at
 * @property {string} [updatedBy]       - Updated by
 * @property {string} [updatedAt]       - Updated at
 */

class MercadopagoModel {
    /**
     * Mercadopago id
     * @type {number}
     */
    mercadopagoId;

    /**
     * Body
     * @type {object}
     */
    body;

    /**
     * Preference id
     * @type {string|undefined}
     */
    preferenceId;

    /**
     * State
     * @type {string}
     */
    state;

    /**
     * Merchant order id
     * @type {string|undefined}
     */
    merchantOrderId;

    /**
     * Merchant order
     * @type {object|undefined}
     */
    merchantOrder;

    /**
     * Created by
     * @type {string}
     */
    createdBy;

    /**
     * Created at
     * @type {string}
     */
    createdAt;

    /**
     * Updated by
     * @type {string|undefined}
     */
    updatedBy;

    /**
     * Updated at
     * @type {string|undefined}
     */
    updatedAt;

    /**
     * Creates a mercadopago model
     * @param {Mercadopago} mercadopago - Mercadopago
     * @returns {MercadopagoModel}
     */
    static fromPayment(mercadopago) {
        return modelFromObject(mercadopago, MercadopagoModel);
    }
}

module.exports = {
    MercadopagoModel,
};
