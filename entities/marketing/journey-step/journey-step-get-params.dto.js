const { isUndefinedOrNull, validateInteger } = require("../../validators");
const { modelFromObject } = require("../../utils");

/**
 * @typedef {object} JourneyStepGetParamsDto
 * @property {number} journeyStepId - Journey step id, min 1
 */

class JourneyStepGetParamsDtoModel {
    /**
     * Journey step id, min 1
     * @type {number}
     */
    journeyStepId;

    /**
     * Creates a model
     * @param {JourneyStepGetParamsDto} dto - Dto
     * @returns {JourneyStepGetParamsDtoModel}
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
            case "journeyStepId":
                this.journeyStepId = validateInteger(
                    this.journeyStepId,
                    "journeyStepId",
                    "id del paso del journey",
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

module.exports = { JourneyStepGetParamsDtoModel };
