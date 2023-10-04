const { modelFromObject } = require("../../utils");
const { isUndefinedOrNull, validateDateString } = require("../../validators");

/**
 * @typedef {object} SurveyGetResultsParamsDto
 * @property {string} from - From date
 * @property {string} to - To date
 */

class SurveyGetResultsParamsDtoModel {
    /**
     * From date
     * @type {string}
     */
    from;

    /**
     * To date
     * @type {string}
     */
    to;

    /**
     * Creates model
     * @param {SurveyGetResultsParamsDto} dto - Dto
     * @returns {SurveyGetResultsParamsDtoModel}
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
            case "from":
                this.from = validateDateString(this.from, "from", "From date");
                break;
            case "to":
                this.to = validateDateString(this.to, "to", "To date");
                break;
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = {
    SurveyGetResultsParamsDtoModel,
};
