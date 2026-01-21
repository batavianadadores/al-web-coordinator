const { modelFromObject } = require("../../utils");
const { isUndefinedOrNull, validateInteger } = require("../../validators");

/**
 * @typedef {Object} StockDeleteParamsDto
 * @property {number} stockId - Stock id
 */

class StockDeleteParamsDtoModel {
    /**
     * Stock id
     * @type {number}
     */
    stockId;

    /**
     * Creates dto model from dto
     * @param {StockDeleteParamsDto} object - Object
     * @returns {StockDeleteParamsDtoModel}
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
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = { StockDeleteParamsDtoModel };
