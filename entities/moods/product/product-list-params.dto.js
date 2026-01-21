const { modelFromObject } = require("../../utils");
const PaginationDtoModel = require("../../common/pagination.dto");
const {
    isUndefinedOrNull,
    validateString,
    validateStringBoolean,
    validateInteger,
} = require("../../validators");

/**
 * @typedef {Object} ProductListParamsDtoType
 * @property {string} name - Name
 * @property {string} sku - SKU
 * @property {string} variationType - Variation type
 * @property {string} variationValue - Variation value
 * @property {string} locationName - Location Name
 * @property {boolean} sellerView - Seller view
 * @property {number} poolId - Pool id
 *
 * @typedef {PaginationDtoModel.PaginationDto & ProductListParamsDtoType} ProductListParamsDto
 */

class ProductListParamsDtoModel extends PaginationDtoModel {
    /**
     * Name
     * @type {string}
     */
    name;

    /**
     * SKU
     * @type {string}
     */
    sku;

    /**
     * Variation type
     * @type {string}
     */
    variationType;

    /**
     * Variation value
     * @type {string}
     */
    variationValue;

    /**
     * Location name
     * @type {string}
     */
    locationName;

    /**
     * Seller view
     * @type {boolean}
     */
    sellerView;

    /**
     * Pool id
     * @type {number}
     */
    poolId;

    /**
     * Creates dto model from dto
     * @param {ProductListParamsDto} object - Object
     * @returns {ProductListParamsDtoModel}
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
                    max: 100,
                    optional: true,
                });
                break;
            case "sku":
                this.sku = validateString(this.sku, "sku", "el sku", {
                    max: 100,
                    optional: true,
                });
                break;
            case "variationType":
                this.variationType = validateString(
                    this.variationType,
                    "variationType",
                    "el tipo de variación",
                    {
                        max: 100,
                        optional: true,
                    }
                );
                break;
            case "variationValue":
                this.variationValue = validateString(
                    this.variationValue,
                    "variationValue",
                    "el valor de la variación",
                    {
                        max: 100,
                        optional: true,
                    }
                );
                break;
            case "locationName":
                this.locationName = validateString(
                    this.locationName,
                    "locationName",
                    "el nombre de la ubicación",
                    {
                        max: 100,
                        optional: true,
                    }
                );
                break;
            case "sku":
                this.sku = validateString(this.sku, "sku", "el sku", {
                    max: 100,
                    optional: true,
                });
                break;
            case "sellerView":
                this.sellerView = validateStringBoolean(
                    this.sellerView,
                    "sellerView",
                    "la vista de vendedor",
                    { optional: true }
                );
                break;
            case "poolId":
                this.poolId = validateInteger(this.poolId, "poolId", "el id de la piscina", {
                    optional: true,
                    min: 1
                })
                break;
            default:
                super.validate(property);
        }
    }
}

module.exports = { ProductListParamsDtoModel };
