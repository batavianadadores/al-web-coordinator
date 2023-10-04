const { modelFromObject } = require("../../utils");
const { isUndefinedOrNull, validateInteger } = require("../../validators");

/**
 * @typedef {object} SurveyQuotaAddParamsDto
 * @property {number} surveyId - Survey Id, min 1
 * @property {number} surveyPoolId - Survey Pool Id, min 1
 */

class SurveyQuotaAddParamsDtoModel {
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
     * Creates model
     * @param {SurveyQuotaAddParamsDto} dto - Dto
     * @returns {SurveyQuotaAddParamsDtoModel}
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
                    "id del grupo de encuestas",
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

module.exports = { SurveyQuotaAddParamsDtoModel };
