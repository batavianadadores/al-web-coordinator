/**
 * @typedef {Object} SurveyQuota
 * @property {number} surveyQuotaId         - Survey Quota Id, min 1
 * @property {number} surveyId              - Survey Id, min 1
 * @property {number} surveyPoolId          - Survey Pool Id, min 1
 * @property {string} date                  - Date, string date
 * @property {number} quota                 - Quota, min 1
 * @property {boolean} isDelete             - Is Delete, boolean
 */

class SurveyQuotaModel {
    /**
     * Survey Quota Id, min 1
     * @type {number}
     */
    surveyQuotaId;

    /**
     * Survey Id, min 1
     * @type {number}
     */
    surveyId;

    /**
     * Survey Pool Id, min 1
     * @type {number}
     */
    surveyPoolId;

    /**
     * Date, string date
     * @type {string}
     */
    date;

    /**
     * Quota, min 1
     * @type {number}
     */
    quota;

    /**
     * Is Delete, boolean
     * @type {boolean}
     */
    isDelete;

    /**
     * Creates a SurveyQuotaModel
     * @param {SurveyQuota} object - Object
     * @returns {SurveyQuotaModel}
     */
    static fromSale(object) {
        return modelFromObject(object, SurveyQuotaModel);
    }
}

module.exports = { SurveyQuotaModel };
