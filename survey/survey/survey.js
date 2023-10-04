/**
 * @typedef {Object} Survey
 * @property {number} surveyId - Survey Id, min 1
 * @property {string} title - Title
 * @property {string} description - Description
 * @property {Date} startDate - Start date
 * @property {Date} endDate - End date
 * @property {number} quota - Quota
 * @property {boolean} isDeleted - Is deleted
 */

class SurveyModel {
    /**
     * Survey Id, min 1
     * @type {number}
     */
    surveyId;

    /**
     * Title
     * @type {string}
     */
    title;

    /**
     * Description
     * @type {string}
     */
    description;

    /**
     * Start date
     * @type {Date}
     */
    startDate;

    /**
     * End date
     * @type {Date}
     */
    endDate;

    /**
     * Quota
     * @type {number}
     */
    quota;

    /**
     * Is deleted
     * @type {boolean}
     */
    isDeleted;

    /**
     * Creates a SurveyModel
     * @param {Survey} object - Object
     * @returns {SurveyModel}
     */
    static fromSale(object) {
        return modelFromObject(object, SurveyModel);
    }
}

module.exports = { SurveyModel };
