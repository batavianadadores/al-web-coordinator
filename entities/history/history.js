const { modelFromObject } = require("../utils");

/**
 * @typedef {Object} History
 * @property {number} historySaleDetailId - History sale detail
 * @property {number} saleDetailId - Sale detail id
 * @property {string} performedBy - Performed by
 * @property {string} createdOn - Created on
 * @property {string} action - Action
 * @property {string} type - Type
 * @property {string} comment - Comment
 */

class HistoryModel {
    /**
     * historySaleDetailId
     * @type {number}
     */
    historySaleDetailId;

    /**
     * saleDetailId
     * @type {number}
     */
    saleDetailId;

    /**
     * performedBy
     * @type {string}
     */
    performedBy;

    /**
     * createdOn
     * @type {string}
     */
    createdOn;

    /**
     * action
     * @type {string}
     */
    action;

    /**
     * type
     * @type {string}
     */
    type;

    /**
     * comment
     * @type {string}
     */
    comment;

    /**
     * Creates a model from object
     * @param {History} object - Object
     * @returns {HistoryModel}
     */
    static fromObject = (object) => {
        return modelFromObject(object, HistoryModel);
    };
}

module.exports = { HistoryModel };
