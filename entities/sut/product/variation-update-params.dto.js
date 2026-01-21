const { modelFromObject } = require("../../utils");
const {
    isUndefinedOrNull,
    validateString,
    validateDecimal,
    validateInteger,
    isUndefined,
} = require("../../validators");

/**
 * @typedef {Object} VariationUpdateParamsDto
 * @property {number} variationId - Variation id
 * @property {number} variationTypeId - Variation type id
 * @property {number} variationValueId - Variation value id
 * @property {string} variationValue - Variation value
 * @property {string} price - Price
 * @property {string} sku - SKU
 * @property {string} picture - Picture
 */

class VariationUpdateParamsDtoModel {
    /**
     * Variation id
     * @type {number}
     */
    variationId;

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
     * @param {VariationUpdateParamsDto} object - Object
     * @returns {VariationUpdateParamsDtoModel}
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
                isUndefined(this.variationId) &&
                isUndefined(this.variationTypeId) &&
                isUndefined(this.variationValueId) &&
                isUndefined(this.variationValue) &&
                isUndefined(this.price) &&
                isUndefined(this.sku) &&
                isUndefined(this.picture)
            ) {
                throw ValidationError.NoValuesToUpdate();
            }

            return;
        }

        switch (property) {
            case "variationId":
                this.variationId = validateInteger(
                    this.variationId,
                    "variationId",
                    "el id de la variacion",
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

module.exports = { VariationUpdateParamsDtoModel };
