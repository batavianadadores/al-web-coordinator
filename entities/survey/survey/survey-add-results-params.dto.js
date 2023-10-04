const { modelFromObject } = require("../../utils");
const {
    isUndefinedOrNull,
    validateInteger,
    validateString,
    validateArray,
} = require("../../validators");

/**
 * @typedef {object} SurveyAddResultParamsDto
 * @property {number} questionId - Question id
 * @property {number} score - Score
 */

/**
 * @typedef {object} SurveyAddResultsParamsDto
 * @property {string} hash - Hash
 * @property {number} studentId - Student id
 * @property {SurveyAddResultParamsDto[]} results - Results
 */

class SurveyAddResultsParamsDtoModel {
    /**
     * Hash
     * @type {string}
     */
    hash;

    /**
     * Student id
     * @type {number}
     */
    studentId;

    /**
     * Results
     * @type {SurveyAddResultParamsDto[]}
     */
    results;

    /**
     * Creates model
     * @param {SurveyAddResultsParamsDto} dto - Dto
     * @returns {SurveyAddResultsParamsDtoModel}
     */
    static fromDto = (dto) => {
        return modelFromObject(dto, this);
    };

    /**
     * Validate a property of the object, or all if not parameter is passed.
     * Throws a validation error in case validation fails
     * @param {string} [property] - Property to validate
     * @returns {void}
     */
    validate(property) {
        if (isUndefinedOrNull(property)) {
            for (const key in this) {
                if (Object.hasOwnProperty.call(this, key)) {
                    this.validate(key);
                }
            }
            return;
        }

        switch (property) {
            case "hash":
                this.hash = validateString(this.hash, "hash", "hash", {
                    min: 1,
                    regex: /^[a-f0-9]{32}$/g,
                    regexExplanation: "Hash hexadecimal",
                });
                break;
            case "studentId":
                this.studentId = validateInteger(
                    this.studentId,
                    "studentId",
                    "id del alumno",
                    {
                        min: 1,
                    }
                );
                break;
            case "results":
                this.results = validateArray(
                    this.results,
                    "results",
                    "Resultados",
                    {
                        canBeEmpty: false,
                    }
                );

                this.results.forEach((result, index) => {
                    validateInteger(
                        result.questionId,
                        "results.questionId",
                        `id de la pregunta ${index + 1}`,
                        { min: 1 }
                    );
                    validateInteger(
                        result.score,
                        "results.score",
                        `puntaje de la pregunta ${index + 1}`,
                        { min: 1 }
                    );
                });
                break;
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = { SurveyAddResultsParamsDtoModel };
