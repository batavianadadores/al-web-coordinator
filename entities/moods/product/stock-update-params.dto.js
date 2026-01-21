const { modelFromObject } = require("../../utils");
const {
    isUndefinedOrNull,
    validateInteger,
    isUndefined,
} = require("../../validators");

/**
 * @typedef {Object} StockUpdateParamsDto
 * @property {number} stockId - Stock id
 * @property {number} available - Available
 */

class StockUpdateParamsDtoModel {
    /**
     * Stock id
     * @type {number}
     */
    stockId;

    /**
     * Variation value
     * @type {number}
     */
    available;

    /**
     * Creates dto model from dto
     * @param {StockUpdateParamsDto} object - Object
     * @returns {StockUpdateParamsDtoModel}
     */
    static fromDto = (object) => {
        return modelFromObject(object, this);
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

            if (isUndefined(this.stockId) && isUndefined(this.available)) {
                throw ValidationError.NoValuesToUpdate();
            }

            return;
        }

        switch (property) {
            case "stockId":
                this.stockId = validateInteger(
                    this.stockId,
                    "stockId",
                    "el id del stock",
                    {
                        min: 1,
                    }
                );
                break;
            case "available":
                this.available = validateInteger(
                    this.available,
                    "available",
                    "el número de items disponible",
                    {
                        min: 0,
                        optional: true,
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

module.exports = { StockUpdateParamsDtoModel };
