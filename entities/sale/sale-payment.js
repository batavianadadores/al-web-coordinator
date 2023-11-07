const { modelFromObject } = require("../utils");

/**
 * @typedef Type
 * @type { ("yape" | "pos" | "efectivo" | "mercadopago" | "transferencia_bcp" | "transferencia_bbva" | "transferencia_scotiabank" | "transferencia_interbank" | "transferencia_banbif" | "club") }
 */

const _Types = Object.freeze({
    all: [
        "yape",
        "pos",
        "efectivo",
        "mercadopago",
        "transferencia_bcp",
        "transferencia_bbva",
        "transferencia_scotiabank",
        "transferencia_interbank",
        "transferencia_banbif",
        "club",
    ],
    yape: { key: "yape", description: "Yape" },
    pos: { key: "pos", description: "POS" },
    efectivo: { key: "efectivo", description: "Efectivo" },
    mercadopago: { key: "mercadopago", description: "Mercado Pago" },
    transferencia_bcp: {
        key: "transferencia_bcp",
        description: "Transferencia BCP",
    },
    transferencia_bbva: {
        key: "transferencia_bbva",
        description: "Transferencia BBVA",
    },
    transferencia_scotiabank: {
        key: "transferencia_scotiabank",
        description: "Transferencia Scotiabank",
    },
    transferencia_interbank: {
        key: "transferencia_interbank",
        description: "Transferencia Interbank",
    },
    transferencia_banbif: {
        key: "transferencia_banbif",
        description: "Transferencia Banbif",
    },
    transferencia_banbif: {
        key: "club",
        description: "club",
    },
});

/**
 * @typedef {object} SalePayment
 * @property {Type} type        - Type
 * @property {string} amount    - Amount, string decimal
 */

class SalePaymentModel {
    /**
     * Type
     * @type {Type}
     */
    type;

    /**
     * Amount, string decimal
     * @type {string}
     */
    amount;

    /**
     * Creates a sale payment model
     * @param {SalePayment} payment - Payment
     * @returns {SalePaymentModel}
     */
    static fromPayment(payment) {
        return modelFromObject(payment, SalePaymentModel);
    }
}

module.exports = {
    SalePaymentModel,
    Types: _Types,
};
