const { modelFromObject } = require("../../utils");
const { isUndefinedOrNull, validateInteger } = require("../../validators");

/**
 * @typedef {object} SurveyPoolDeleteParamsDto
 * @property {number} surveyPoolId - Survey pool id, min 1.
 */

class SurveyPoolDeleteParamsDtoModel {
    /**
     * Survey pool id, min 1
     * @type {number}
     */
    surveyPoolId;

    /**
     * Creates a model from dto
     * @param {SurveyPoolDeleteParamsDto} dto - Dto
     * @returns {SurveyPoolDeleteParamsDtoModel}
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
            case "surveyPoolId":
                this.surveyPoolId = validateInteger(
                    this.surveyPoolId,
                    "surveyPoolId",
                    "id del pool de encuestas",
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

module.exports = { SurveyPoolDeleteParamsDtoModel };
