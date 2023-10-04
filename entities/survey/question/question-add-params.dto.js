const { modelFromObject } = require("../../utils");
const {
    isUndefinedOrNull,
    validateInteger,
    validateString,
} = require("../../validators");

/**
 * @typedef {object} QuestionAddParamsDto
 * @property {number} surveyId - Survey id, min 1.
 * @property {string} title - Title
 * @property {string} description - Description
 * @property {number} minScore - Min score
 * @property {number} maxScore - Max score
 * @property {string} minScoreText - Min score text
 * @property {string} maxScoreText - Max score text
 */

class QuestionAddParamsDtoModel {
    /**
     * Survey id, min 1.
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
     * Creates model
     * @param {QuestionAddParamsDto} dto - Dto
     * @returns {QuestionAddParamsDtoModel}
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
                    "id del alumno",
                    {
                        min: 1,
                    }
                );
                break;
            case "title":
                this.title = validateString(this.title, "title", "título", {
                    min: 1,
                });
                break;
            case "description":
                this.description = validateString(
                    this.description,
                    "description",
                    "descripción",
                    {
                        optional: true,
                    }
                );
                break;
            case "minScore":
                this.minScore = validateInteger(
                    this.minScore,
                    "minScore",
                    "score mínimo",
                    {
                        min: 1,
                    }
                );
                break;
            case "maxScore":
                this.maxScore = validateInteger(
                    this.maxScore,
                    "maxScore",
                    "score máximo",
                    {
                        min: 1,
                    }
                );
                break;
            case "minScoreText":
                this.minScoreText = validateString(
                    this.minScoreText,
                    "minScoreText",
                    "texto para score mínimo",
                    {
                        optional: true,
                    }
                );
                break;
            case "maxScoreText":
                this.maxScoreText = validateString(
                    this.maxScoreText,
                    "maxScoreText",
                    "texto para score máximo",
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

module.exports = { QuestionAddParamsDtoModel };
