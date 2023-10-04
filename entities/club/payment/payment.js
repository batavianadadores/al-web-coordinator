const { modelFromObject } = require("../../utils");

/**
 * @typedef State
 * @type {('pending'|'delay'|'paid'|'canceled'|'processing')}
 */

const _States = Object.freeze({
    all: ["pending", "delay", "paid", "canceled", "processing"],
    pending: { key: "pending", description: "Pendiente" },
    delay: { key: "delay", description: "Atrasado" },
    paid: { key: "paid", description: "Pagado" },
    canceled: { key: "canceled", description: "Cancelado" },
    processing: { key: "processing", description: "Procesando" },
});

/**
 * @typedef {object} Payment
 * @property {number} paymentId      - Payment id, min 1
 * @property {number} memberId       - Member id, min 1
 * @property {number} saleId         - Sale id, min 1
 * @property {State} state           - State
 * @property {string} dueDate        - Due date, date string
 * @property {string} [paymentDate]  - Payment date, date string
 * @property {number} productId      - Product id, min 1
 */

class PaymentModel {
    /**
     * Payment id, min 1
     * @type {number}
     */
    paymentId;

    /**
     * Member id, min 1
     * @type {number}
     */
    memberId;

    /**
     * Sale id, min 1
     * @type {number}
     */
    saleId;

    /**
     * State
     * @type {State}
     */
    state;

    /**
     * Due date, date string
     * @type {string}
     */
    dueDate;

    /**
     * Payment date, date string
     * @type {string|undefined}
     */
    paymentDate;

    /**
     * Product id, min 1
     * @type {number}
     */
    productId;

    /**
     * Creates a payment model
     * @param {Payment} payment - Payment
     * @returns {PaymentModel}
     */
    static fromPayment(payment) {
        return modelFromObject(payment, PaymentModel);
    }
}

module.exports = {
    PaymentModel,
    States: _States,
};
