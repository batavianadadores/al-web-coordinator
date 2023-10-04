const { modelFromObject } = require("../../utils");
const { isUndefinedOrNull, validateInteger } = require("../../validators");

/**
 * @typedef {object} JourneyGetParamsDto
 * @property {number} journeyId - Journey id, min 1.
 */

class JourneyGetParamsDtoModel {
    /**
     * Journey id, min 1
     * @type {number}
     */
    journeyId;

    /**
     * Creates a model from dto
     * @param {JourneyGetParamsDto} dto - Dto
     * @returns {JourneyGetParamsDtoModel}
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
            case "journeyId":
                this.journeyId = validateInteger(
                    this.journeyId,
                    "JourneyId",
                    "id del journey",
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

module.exports = { JourneyGetParamsDtoModel };
