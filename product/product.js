const { DateTime } = require("luxon");

const { isUndefinedOrNull } = require("../validators");
const { modelFromObject } = require("../utils");

/**
 * @typedef State
 * @type { ("enabled"|"disabled") }
 */

const _States = Object.freeze({
    all: ["enabled", "disabled"],
    enabled: { key: "enabled", description: "Activo" },
    disabled: { key: "disabled", description: "Inactivo" },
});

/**
 * @typedef {object} Product
 * @property {number} productId             - Product id, min 1
 * @property {string} name                  - Product name, max 40 characters
 * @property {string} price                 - Product price, numeric string
 * @property {Date} validityFrom            - Product validity from, date string
 * @property {Date} validityTo              - Product validity to, date string
 * @property {number} courseId              - Course id, min 1
 * @property {number} lessonsNumber         - Number of lessons, min 1
 * @property {boolean} canChangeSchedule    - Can change schedule
 * @property {number} lessonsPerWeek        - Lessons per week, min 1
 * @property {number} poolId                - Pool id, min 1
 * @property {boolean} showInWeb            - Show in web
 * @property {State} state                  - State, max 20 characters
 */

class ProductModel {
    /**
     * Product id, min 1
     * @type {number}
     */
    productId;

    /**
     * Product name, max 40 characters
     * @type {string}
     */
    name;

    /**
     * Product price, numeric string
     * @type {string}
     */
    price;

    /**
     * Product validity from, date string
     * @type {Date}
     */
    validityFrom;

    /**
     * Product validity to, date string
     * @type {Date}
     */
    validityTo;

    /**
     * Course id, min 1
     * @type {number}
     */
    courseId;

    /**
     * Number of lessons, min 1
     * @type {number}
     */
    lessonsNumber;

    /**
     * Can change schedule
     * @type {boolean}
     */
    canChangeSchedule;

    /**
     * Lessons per week, min 1
     * @type {number}
     */
    lessonsPerWeek;

    /**
     * Pool id, min 1
     * @type {number}
     */
    poolId;

    /**
     * Show in web
     * @type {boolean}
     */
    showInWeb;

    /**
     * State, max 20 characters
     * @type {State}
     */
    state;

    /**
     * Creates a product model
     * @param {Product} product - Product
     * @returns {ProductModel}
     */
    static fromProduct = (product) => {
        return modelFromObject(product, ProductModel);
    };

    get priceFormatted() {
        return `S/ ${this.price}`;
    }

    get validityFromFormatted() {
        if (isUndefinedOrNull(this.validityFrom)) {
            return "-";
        }
        return DateTime.fromISO(this.validityFrom).toLocaleString(
            DateTime.DATE_MED
        );
    }

    get validityToFormatted() {
        if (isUndefinedOrNull(this.validityTo)) {
            return "-";
        }
        return DateTime.fromISO(this.validityTo).toLocaleString(
            DateTime.DATE_MED
        );
    }

    get showInWebFormatted() {
        return this.showInWeb ? "Si" : "No";
    }
}

module.exports = { ProductModel, States: _States };
