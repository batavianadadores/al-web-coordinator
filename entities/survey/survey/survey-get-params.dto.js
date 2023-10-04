const { modelFromObject } = require("../../utils");
const {
    isUndefinedOrNull,
    validateString,
    validateInteger,
} = require("../../validators");

/**
 * @typedef {object} SurveyGetParamsDto
 * @property {number} surveyId - Survey ID
 */

class SurveyGetParamsDtoModel {
    /**
     * Survey ID
     * @type {number}
     */
    surveyId;

    /**
     * Creates model
     * @param {SurveyGetParamsDto} dto - Dto
     * @returns {SurveyGetParamsDtoModel}
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
                    "surveyId",
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
    SurveyGetParamsDtoModel,
};
