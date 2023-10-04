const { modelFromObject } = require("../../utils");
const { isUndefinedOrNull, validateInteger } = require("../../validators");

/**
 * @typedef {object} SurveyDeleteParamsDto
 * @property {number} surveyId - Survey id, min 1.
 */

class SurveyDeleteParamsDtoModel {
    /**
     * Survey id, min 1
     * @type {number}
     */
    surveyId;

    /**
     * Creates a model from dto
     * @param {SurveyDeleteParamsDto} dto - Dto
     * @returns {SurveyDeleteParamsDtoModel}
     */
    static fromDto = (dto) => {
        return modelFromObject(dto, this);
    };

    /**
     * Validate a property of the object, or all if not parameter is passed.
     * Throws a validation error in case validation fails
     * @param {string|undefined} property - Property to validate
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
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = { SurveyDeleteParamsDtoModel };
