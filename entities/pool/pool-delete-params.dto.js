const { modelFromObject } = require("../utils");
const { isUndefinedOrNull, validateInteger } = require("../validators");

/**
 * @typedef {object} PoolDeleteParamsDto
 * @property {number} poolId - Pool id, min 1.
 */

class PoolDeleteParamsDtoModel {
    /**
     * Pool id, min 1
     * @type {number}
     */
    poolId;

    /**
     * Creates a model from dto
     * @param {PoolDeleteParamsDto} dto - Dto
     * @returns {PoolDeleteParamsDtoModel}
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

module.exports = { PoolDeleteParamsDtoModel };
