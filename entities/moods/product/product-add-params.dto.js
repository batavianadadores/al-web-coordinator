const { modelFromObject } = require("../../utils");
const {
    isUndefinedOrNull,
    validateString,
    validateDecimal,
} = require("../../validators");

/**
 * @typedef {Object} ProductAddParamsDto
 * @property {string} name - Name
 * @property {string} description - Description
 * @property {string} price - Price
 * @property {string} sku - SKU
 * @property {string} picture - Picture
 */

class ProductAddParamsDtoModel {
    /**
     * Name
     * @type {string}
     */
    name;

    /**
     * Description
     * @type {string}
     */
    description;

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
     * @param {ProductAddParamsDto} object - Object
     * @returns {ProductAddParamsDtoModel}
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
            case "name":
                this.name = validateString(this.name, "name", "el nombre", {
                    min: 1,
                    max: 100,
                });
                break;
            case "description":
                this.description = validateString(
                    this.description,
                    "description",
                    "la descripción",
                    {
                        min: 1,
                        max: 500,
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

module.exports = { ProductAddParamsDtoModel };
