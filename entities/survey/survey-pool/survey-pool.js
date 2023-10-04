/**
 * @typedef {Object} SurveyPool
 * @property {number} surveyPoolId - Survey Pool Id, min 1
 * @property {number} surveyId - Survey Id, min 1
 * @property {number} poolId - Pool Id, min 1
 * @property {string} hash - Hash, fixed length
 * @property {boolean} isDeleted - Is Deleted
 */

class SurveyPoolModel {
    /**
     * Survey Pool Id, min 1
     * @type {number}
     */
    surveyPoolId;

    /**
     * Survey Id, min 1
     * @type {number}
     */
    surveyId;

    /**
     * Pool Id, min 1
     * @type {number}
     */
    poolId;

    /**
     * Hash, fixed length
     * @type {string}
     */
    hash;

    /**
     * Is Deleted
     * @type {boolean}
     */
    isDeleted;

    /**
     * Creates a SurveyPoolModel
     * @param {SurveyPool} object - Object
     * @returns {SurveyPoolModel}
     */
    static fromSale(object) {
        return modelFromObject(object, SurveyPoolModel);
    }
}

module.exports = { SurveyPoolModel };
