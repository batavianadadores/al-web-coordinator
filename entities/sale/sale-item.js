const { modelFromObject } = require("../utils");

/**
 * @typedef {object} SaleItem
 * @property {number} saleItemId        - Sale item id, min 1
 * @property {number} saleId            - Sale id, min 1
 * @property {number} [saleDetailId]    - Sale detail id, min 1
 * @property {number} [productId]       - Product id, min 1
 * @property {string} [productName]     - Product name, min 1
 * @property {string} price             - Price, numeric string
 * @property {number} [lessonsNumber]   - Number of lessons
 * @property {number} [lessonsPerWeek]  - Lessons per week
 * @property {Date} [initDate]        - Init date, date string
 * @property {Date} [endDate]         - End date, date string
 * @property {number} [bonusId]         - Bonus id, min 1
 * @property {string} [bonusCode]       - Bonus code, max 20 characters
 * @property {string} [bonusAmount]     - Bonus amount, numeric string
 * @property {number} [bonusLessons]    - Bonus lessons, min 1
 * @property {boolean} isTaxExonerated  - Is tax exonerated
 * @property {Date} createdOn           - Created on
 * @property {number} courseId          - Course id, min 1
 * @property {number} poolId            - Pool id, min 1
 */

class SaleItemModel {
    /**
     * Sale item id, min 1
     * @type {number}
     */
    saleItemId;

    /**
     * Sale id, min 1
     * @type {number}
     */
    saleId;

    /**
     * Sale detail id, min 1
     * @type {number|undefined}
     */
    saleDetailId;

    /**
     * Product id, min 1
     * @type {number|undefined}
     */
    productId;

    /**
     * Product name, min 1
     * @type {string|undefined}
     */
    productName;

    /**
     * Price, numeric string
     * @type {string}
     */
    price;

    /**
     * Number of lessons
     * @type {number|undefined}
     */
    lessonsNumber;

    /**
     * Lessons per week
     * @type {number|undefined}
     */
    lessonsPerWeek;

    /**
     * Init date
     * @type {Date|undefined}
     */
    initDate;

    /**
     * End date
     * @type {Date|undefined}
     */
    endDate;

    /**
     * Bonus id, min 1
     * @type {number|undefined}
     */
    bonusId;

    /**
     * Bonus code, max 20 characters
     * @type {string|undefined}
     */
    bonusCode;

    /**
     * Bonus amount, numeric string
     * @type {string|undefined}
     */
    bonusAmount;

    /**
     * Bonus lessons, min 1
     * @type {number|undefined}
     */
    bonusLessons;

    /**
     * Is tax exonerated
     * @type {boolean}
     */
    isTaxExonerated;

    /**
     * Created on
     * @type {Date}
     */
    createdOn;

    /**
     * Course id, min 1
     * @type {number|undefined}
     */
    courseId;

    /**
     * Pool id, min 1
     * @type {number|undefined}
     */
    poolId;

    /**
     * Creates a sale item model
     * @param {SaleItem} saleItem - Sale item
     * @returns {SaleItemModel}
     */
    static fromSaleItem = (saleItem) => {
        return modelFromObject(saleItem, SaleItemModel);
    };
}

module.exports = { SaleItemModel };
