const Survey = require("../survey/survey");
const Question = require("../question/question");
const Pool = require("../../pool/pool");

/**
 * @typedef {object} SurveyGetReportResults
 * @property {number} poolId - Pool id
 * @property {number} questionId - Question Id
 * @property {string} time - Time
 * @property {string} total - Total
 * @property {number} totalCount - Total count
 * @property {string[]} level - Level
 */

/**
 * @typedef {object} SurveyGetReportResponseDto
 * @property {Survey.Survey} survey - Survey
 * @property {Question[]} questions - Questions
 * @property {Pool.Pool[]} pools - Pools
 * @property {SurveyGetReportResults[]} results - Results
 */

module.exports = {};
