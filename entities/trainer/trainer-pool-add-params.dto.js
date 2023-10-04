const { modelFromObject } = require("../utils");
const { isUndefinedOrNull, validateInteger } = require("../validators");

/**
 * @typedef {object} TrainerPoolAddParamsDto
 * @property {number} trainerId   - Trainer id, min 1.
 * @property {number} poolId      - Pool id, min 1.
 */

class TrainerPoolAddParamsDtoModel {
    /**
     * Trainer id, min 1
     * @type {number}
     */
    trainerId;

    /**
     * Pool id, min 1
     * @type {number}
     */
    poolId;

    /**
     * Creates model
     * @param {TrainerPoolAddParamsDto} dto - Dto
     * @returns {TrainerPoolAddParamsDtoModel}
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
            case "poolId":
                this.poolId = validateInteger(
                    this.poolId,
                    "poolId",
                    "id de la piscina",
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

module.exports = { TrainerPoolAddParamsDtoModel };
