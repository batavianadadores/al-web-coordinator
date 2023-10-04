const { modelFromObject } = require("../../utils");
const {
    isUndefinedOrNull,
    validateInteger,
    validateString,
} = require("../../validators");

/**
 * @typedef {object} ResultAddParamsDto
 * @property {number} surveyId - Survey id
 * @property {number} surveyPoolId - Survey pool id
 * @property {number} studentId - Student id
 * @property {number} questionId - Question id
 * @property {number} score - Score
 * @property {string} comment - Comment
 */

class ResultAddParamsDtoModel {
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
     * Creates model
     * @param {ResultAddParamsDto} dto - Dto
     * @returns {ResultAddParamsDtoModel}
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
            case "surveyId":
                this.surveyId = validateInteger(
                    this.surveyId,
                    "surveyId",
                    "id de la encuesta",
                    {
                        min: 1,
                    }
                );
                break;
            case "surveyPoolId":
                this.surveyPoolId = validateInteger(
                    this.surveyPoolId,
                    "surveyPoolId",
                    "id de la piscina de encuestas",
                    {
                        min: 1,
                    }
                );
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
            case "questionId":
                this.questionId = validateInteger(
                    this.questionId,
                    "questionId",
                    "id de la pregunta",
                    {
                        min: 1,
                    }
                );
                break;
            case "score":
                this.score = validateInteger(this.score, "score", "puntaje", {
                    min: 1,
                });
                break;
            case "comment":
                this.comment = validateString(
                    this.comment,
                    "comment",
                    "comentario",
                    {
                        optional: true,
                    }
                );
                break;
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = { ResultAddParamsDtoModel };
