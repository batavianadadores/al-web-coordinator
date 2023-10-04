const { modelFromObject } = require("../../utils");
const { isUndefinedOrNull, validateString } = require("../../validators");

/**
 * @typedef {object} ResultGetParamsDto
 * @property {string} resultId - Result ID
 */

class ResultGetParamsDtoModel {
    /**
     * Result ID
     * @type {string}
     */
    resultId;

    /**
     * Creates model
     * @param {ResultGetParamsDto} dto - Dto
     * @returns {ResultGetParamsDtoModel}
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
            case "resultId":
                this.resultId = validateString(
                    this.resultId,
                    "resultId",
                    "resultId",
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
    ResultGetParamsDtoModel,
};
