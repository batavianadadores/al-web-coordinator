const { modelFromObject } = require("../../utils");
const { isUndefinedOrNull, validateInteger } = require("../../validators");

/**
 * @typedef {Object} StockAddParamsDto
 * @property {number} productId - Product id
 * @property {number} variationId - Variation id
 * @property {number} locationId - Location id
 * @property {number} available - Available
 */

class StockAddParamsDtoModel {
    /**
     * Product id
     * @type {number}
     */
    productId;

    /**
     * Variation type id
     * @type {number}
     */
    variationId;

    /**
     * Variation value id
     * @type {number}
     */
    locationId;

    /**
     * Variation value
     * @type {number}
     */
    available;

    /**
     * Creates dto model from dto
     * @param {StockAddParamsDto} object - Object
     * @returns {StockAddParamsDtoModel}
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
            case "productId":
                this.productId = validateInteger(
                    this.productId,
                    "productId",
                    "el id del producto",
                    {
                        min: 1,
                    }
                );
                break;
            case "variationId":
                this.variationId = validateInteger(
                    this.variationId,
                    "variationId",
                    "el id de la variación",
                    {
                        min: 1,
                    }
                );
                break;
            case "locationId":
                this.locationId = validateInteger(
                    this.locationId,
                    "locationId",
                    "el id de la tienda",
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

module.exports = { StockAddParamsDtoModel };
