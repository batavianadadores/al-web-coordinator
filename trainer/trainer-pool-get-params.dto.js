const { modelFromObject } = require("../utils");
const { isUndefinedOrNull, validateInteger } = require("../validators");

/**
 * @typedef {object} TrainerPoolGetParamsDto
 * @property {number} poolId      - Pool id, min 1.
 * @property {number} trainerId   - Trainer id, min 1.
 */

class TrainerPoolGetParamsDtoModel {
    /**
     * Pool id, min 1
     * @type {number}
     */
    poolId;

    /**
     * Trainer id, min 1
     * @type {number}
     */
    trainerId;

    /**
     * Creates model
     * @param {TrainerPoolGetParamsDto} dto - Dto
     * @returns {TrainerPoolGetParamsDtoModel}
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
                super.validate(property);
        }
    }
}

module.exports = {
    TrainerPoolGetParamsDtoModel,
};
