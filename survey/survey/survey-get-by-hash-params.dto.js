const { modelFromObject } = require("../../utils");
const { isUndefinedOrNull, validateString } = require("../../validators");

/**
 * @typedef {object} SurveyGetByHashParamsDto
 * @property {string} hash - Survey hash
 */

class SurveyGetByHashParamsDtoModel {
    /**
     * Survey hash
     * @type {string}
     */
    hash;

    /**
     * Creates model
     * @param {SurveyGetByHashParamsDto} dto - Dto
     * @returns {SurveyGetByHashParamsDtoModel}
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
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = {
    SurveyGetByHashParamsDtoModel,
};
