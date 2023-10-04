/**
 * @typedef {Object} Result
 * @property {number} resultId - Result id
 * @property {number} surveyId - Survey id
 * @property {number} surveyPoolId - Survey pool id
 * @property {number} studentId - Student id
 * @property {number} questionId - Question id
 * @property {Date} date - Date
 * @property {number} score - Score
 * @property {string} comment - Comment
 * @property {boolean} isDeleted - Is deleted
 */

class ResultModel {
    /**
     * Result id
     * @type {number}
     */
    resultId;

    /**
     * Survey id
     * @type {number}
     */
    surveyId;

    /**
     * Survey pool id
     * @type {number}
     */
    surveyPoolId;

    /**
     * Student id
     * @type {number}
     */
    studentId;

    /**
     * Question id
     * @type {number}
     */
    questionId;

    /**
     * Date
     * @type {Date}
     */
    date;

    /**
     * Score
     * @type {number}
     */
    score;

    /**
     * Comment
     * @type {string}
     */
    comment;

    /**
     * Is deleted
     * @type {boolean}
     */
    isDeleted;

    /**
     * Creates a ResultModel
     * @param {Result} object - Object
     * @returns {ResultModel}
     */
    static fromSale(object) {
        return modelFromObject(object, ResultModel);
    }
}

module.exports = { ResultModel };
