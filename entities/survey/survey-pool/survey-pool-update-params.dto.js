const { modelFromObject } = require("../../utils");
const {
    isUndefinedOrNull,
    validateInteger,
    isUndefined,
    validateString,
} = require("../../validators");

/**
 * @typedef {object} SurveyPoolUpdateParamsDto
 * @property {number} surveyPoolId - Survey Pool Id, min 1
 * @property {number} surveyId - Survey Id, min 1
 */

class SurveyPoolUpdateParamsDtoModel {
    /**
     * Survey Pool Id, min 1
     * @type {number}
     */
    surveyPoolId;

    /**
     * Survey Id, min 1
     * @type {number}
     */
    surveyId;

    /**
     * Creates model
     * @param {SurveyPoolUpdateParamsDto} dto - Dto
     * @returns {SurveyPoolUpdateParamsDtoModel}
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

            if (
                isUndefined(this.surveyId) &&
                isUndefined(this.surveyPoolId)
            ) {
                throw ValidationError.NoValuesToUpdate();
            }
            return;
        }

        switch (property) {
            case "surveyId":
                this.surveyId = validateInteger(
                    this.surveyId,
                    "surveyId",
                    "id de encuesta",
                    {
                        min: 1,
                    }
                );
                break;
            case "surveyPoolId":
                this.surveyPoolId = validateInteger(
                    this.surveyPoolId,
                    "surveyPoolId",
                    "id de encuesta de entrenador",
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

module.exports = {
    SurveyPoolUpdateParamsDtoModel,
};
