const { modelFromObject } = require("../../utils");
const { isUndefinedOrNull, validateInteger } = require("../../validators");

/**
 * @typedef {Object} ProductDeleteParamsDto
 * @property {number} productId - Product id
 */

class ProductDeleteParamsDtoModel {
    /**
     * Product id
     * @type {number}
     */
    productId;

    /**
     * Creates dto model from dto
     * @param {ProductDeleteParamsDto} object - Object
     * @returns {ProductDeleteParamsDtoModel}
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
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = { ProductDeleteParamsDtoModel };
