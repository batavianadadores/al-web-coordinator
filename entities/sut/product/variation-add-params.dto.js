const { modelFromObject } = require("../../utils");
const {
    isUndefinedOrNull,
    validateString,
    validateDecimal,
    validateInteger,
} = require("../../validators");

/**
 * @typedef {Object} VariationAddParamsDto
 * @property {number} productId - Product id
 * @property {number} variationTypeId - Variation type id
 * @property {number} variationValueId - Variation value id
 * @property {string} variationValue - Variation value
 * @property {string} price - Price
 * @property {string} sku - SKU
 * @property {string} picture - Picture
 */

class VariationAddParamsDtoModel {
    /**
     * Product id
     * @type {number}
     */
    productId;

    /**
     * Variation type id
     * @type {number}
     */
    variationTypeId;

    /**
     * Variation value id
     * @type {number}
     */
    variationValueId;

    /**
     * Variation value
     * @type {string}
     */
    variationValue;

    /**
     * Price
     * @type {string}
     */
    price;

    /**
     * SKU
     * @type {string}
     */
    sku;

    /**
     * Picture
     * @type {string}
     */
    picture;

    /**
     * Creates dto model from dto
     * @param {VariationAddParamsDto} object - Object
     * @returns {VariationAddParamsDtoModel}
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
            case "variationTypeId":
                this.variationTypeId = validateInteger(
                    this.variationTypeId,
                    "variationTypeId",
                    "el id del tipo",
                    {
                        min: 1,
                        optional: true,
                    }
                );
                break;
            case "variationValueId":
                this.variationValueId = validateInteger(
                    this.variationValueId,
                    "variationValueId",
                    "el id del valor",
                    {
                        min: 1,
                        optional: true,
                    }
                );
                break;
            case "variationValue":
                this.variationValue = validateString(
                    this.variationValue,
                    "variation value",
                    "el valor",
                    {
                        min: 1,
                        max: 500,
                        optional: true,
                    }
                );
                break;
            case "price":
                this.price = validateDecimal(this.price, "price", "el precio");
                break;
            case "sku":
                this.sku = validateString(this.sku, "sku", "el sku", {
                    max: 100,
                });
                break;
            case "picture":
                this.picture = validateString(
                    this.picture,
                    "picture",
                    "la foto",
                    { optional: true }
                );
                break;
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = { VariationAddParamsDtoModel };
