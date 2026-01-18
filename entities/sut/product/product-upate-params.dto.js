const { modelFromObject } = require("../../utils");
const {
    isUndefinedOrNull,
    validateString,
    validateDecimal,
    isUndefined,
    validateInteger,
} = require("../../validators");

/**
 * @typedef {Object} ProductUpdateParamsDto
 * @property {number} productId - Product id
 * @property {string} name - Name
 * @property {string} description - Description
 * @property {string} price - Price
 * @property {string} sku - SKU
 * @property {string} picture - Picture
 */

class ProductUpdateParamsDtoModel {
    /**
     * Product id
     * @type {number}
     */
    productId;

    /**
     * Name
     * @type {string|undefined}
     */
    name;

    /**
     * Description
     * @type {string|undefined}
     */
    description;

    /**
     * Price
     * @type {string|undefined}
     */
    price;

    /**
     * SKU
     * @type {string|undefined}
     */
    sku;

    /**
     * Picture
     * @type {string|undefined}
     */
    picture;

    /**
     * Creates dto model from dto
     * @param {ProductUpdateParamsDto} object - Object
     * @returns {ProductUpdateParamsDtoModel}
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

            if (
                isUndefined(this.name) &&
                isUndefined(this.description) &&
                isUndefined(this.price) &&
                isUndefined(this.sku)
            ) {
                throw ValidationError.NoValuesToUpdate();
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
                        min: 0,
                    }
                );
                break;
            case "name":
                this.name = validateString(this.name, "name", "el nombre", {
                    min: 1,
                    max: 100,
                    optional: true,
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
                        optional: true,
                    }
                );
                break;
            case "price":
                this.price = validateDecimal(this.price, "price", "el precio", {
                    optional: true,
                });
                break;
            case "sku":
                this.sku = validateString(this.sku, "sku", "el sku", {
                    max: 100,
                    optional: true,
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

module.exports = { ProductUpdateParamsDtoModel };
