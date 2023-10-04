const { modelFromObject } = require("../utils");
const { isUndefinedOrNull, validateInteger } = require("../validators");

/**
 * @typedef {object} ResultDeleteParamsDto
 * @property {number} resultId - Result id, min 1.
 */

class ResultDeleteParamsDtoModel {
    /**
     * Result id, min 1
     * @type {number}
     */
    resultId;

    /**
     * Creates a model from dto
     * @param {ResultDeleteParamsDto} dto - Dto
     * @returns {ResultDeleteParamsDtoModel}
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
            case "resultId":
                this.resultId = validateInteger(
                    this.resultId,
                    "resultId",
                    "id del resultado",
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

module.exports = { ResultDeleteParamsDtoModel };
