const { modelFromObject } = require("../utils");
const { isUndefinedOrNull, validateInteger } = require("../validators");

/**
 * @typedef {object} TrainerGetParamsDto
 * @property {number} trainerId - Trainer id, min 1.
 */

class TrainerGetParamsDtoModel {
    /**
     * Trainer id, min 1
     * @type {number}
     */
    trainerId;

    /**
     * Creates a model from dto
     * @param {TrainerGetParamsDto} dto - Dto
     * @returns {TrainerGetParamsDtoModel}
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
            case "trainerId":
                this.trainerId = validateInteger(
                    this.trainerId,
                    "trainerId",
                    "id del entrenador",
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

module.exports = { TrainerGetParamsDtoModel };
