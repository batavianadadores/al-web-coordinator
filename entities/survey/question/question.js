/**
 * @typedef {Object} Question
 * @property {number} questionId - Question id, min 1
 * @property {number} surveyId - Survey id, min 1
 * @property {string} title - Title
 * @property {string} description - Description
 * @property {number} minScore - Min score
 * @property {number} maxScore - Max score
 * @property {string} minScoreText - Min score text
 * @property {string} maxScoreText - Max score text
 * @property {boolean} isDeleted - Is deleted
 * @property {string} descriptionAdult - Description adult
 * @property {QuestionType} type - Type
 */

/**
 * @typedef {('attention'|'facilities'|'professor')} QuestionType
 */

class QuestionModel {
    /**
     * Question id, min 1
     * @type {number}
     */
    questionId;

    /**
     * Survey id, min 1
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
     * Min score
     * @type {number}
     */
    minScore;

    /**
     * Max score
     * @type {number}
     */
    maxScore;

    /**
     * Min score text
     * @type {string}
     */
    minScoreText;

    /**
     * Max score text
     * @type {string}
     */
    maxScoreText;

    /**
     * Is deleted
     * @type {boolean}
     */
    isDeleted;

    /**
     * Description adult
     * @type {string}
     */
    descriptionAdult;

    /**
     * Creates a QuestionModel
     * @param {Question} object - Object
     * @returns {QuestionModel}
     */
    static fromSale(object) {
        return modelFromObject(object, QuestionModel);
    }
}

module.exports = { QuestionModel };
