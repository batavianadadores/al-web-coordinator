const { modelFromObject } = require("../utils");

/**
 * @typedef {object} SaleDetail
 * @property {number} saleDetailId      - Sale detail id, min 1
 * @property {number} saleId            - Sale id, min 1
 * @property {number} productId         - Product id, min 1
 * @property {number} studentId         - Student id, min 1
 * @property {string} price             - Price, numeric string
 * @property {number} lessonsNumber     - Number of lessons
 * @property {string} initDate          - Init date, date string
 * @property {string} endDate           - End date, date string
 * @property {string} [updatedAt]       - Updated at, data string
 * @property {string} [updatedBy]       - Updated by, max 40 characters
 * @property {number} [bonusId]         - Bonus id, min 1
 * @property {string} [bonusCode]       - Bonus code, max 20 characters
 * @property {string} [bonusAmount]     - Bonus amount, numeric string
 * @property {number} [bonusLessons]    - Bonus lessons, min 1
 * @property {number} [frozenLessons]   - Number of frozen lessons, min 0
 * @property {boolean} allowExtension   - Allow extension
 * @property {number[]} docIds          - Document ids
 */

class SaleDetailModel {
    /**
     * Sale detail id, min 1
     * @type {number}
     */
    saleDetailId;

    /**
     * Sale id, min 1
     * @type {number}
     */
    saleId;

    /**
     * Product id, min 1
     * @type {number}
     */
    productId;

    /**
     * Student id, min 1
     * @type {number}
     */
    studentId;

    /**
     * Price, numeric string
     * @type {string}
     */
    price;

    /**
     * Number of lessons
     * @type {number}
     */
    lessonsNumber;

    /**
     * Init date, date string
     * @type {string}
     */
    initDate;

    /**
     * End date, date string
     * @type {string}
     */
    endDate;

    /**
     * Updated at, data string
     * @type {string|undefined}
     */
    updatedAt;

    /**
     * Updated by, max 40 characters
     * @type {string|undefined}
     */
    updatedBy;

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
     * Number of frozen lessons, min 0
     * @type {number|undefined}
     */
    frozenLessons;

    /**
     * Allow extension
     * @type {boolean}
     */
    allowExtension;

    /**
     * Document ids
     * @type {number[]}
     */
    docIds;

    /**
     * Creates a sale detail model
     * @param {SaleDetail} saleDetail - Sale detail
     * @returns {SaleDetailModel}
     */
    static fromSaleDetail = (saleDetail) => {
        return modelFromObject(saleDetail, SaleDetailModel);
    };
}

module.exports = { SaleDetailModel };
