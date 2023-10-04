const { modelFromObject } = require("../../utils");
const { isUndefinedOrNull, validateInteger } = require("../../validators");

/**
 * @typedef {object} SurveyPoolAddParamsDto
 * @property {number} surveyId - Survey Id, min 1
 * @property {number} poolId - Survey pool Id
 */

class SurveyPoolAddParamsDtoModel {
    /**
     * Survey Id, min 1
     * @type {number}
     */
    surveyId;

    /**
     * Survey pool Id
     * @type {number}
     */
    poolId;

    /**
     * Creates model
     * @param {SurveyPoolAddParamsDto} dto - Dto
     * @returns {SurveyPoolAddParamsDtoModel}
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
            case "poolId":
                this.poolId = validateInteger(
                    this.poolId,
                    "poolId",
                    "id de la piscina",
                    {
                        min: 1,
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

module.exports = { SurveyPoolAddParamsDtoModel };
