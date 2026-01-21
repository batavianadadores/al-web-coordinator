const Survey = require("./survey");

/**
 * @typedef {Object} SurveyResult
 * @property {number} poolId - Pool Id
 * @property {string} name - Name
 * @property {number} questionId - Question Id
 * @property {string} title - Title
 * @property {string} description - Description
 * @property {string} descriptionAdult - Description adult
 * @property {string} type - Type ('professor', 'facilities', 'attention')
 * @property {number} total - Total
 * @property {number} totalCount - Total count
 */

/**
 * @typedef {Object} SurveyTotal
 * @property {number} poolId - Survey pool id
 * @property {number} total - Total
 */

/**
 * @typedef {Object} SurveyResults
 * @property {SurveyResult[]} results - Results
 * @property {Survey.Survey} survey - Survey
 * @property {SurveyTotal[]} totals - Totals
 */

module.exports = {};
