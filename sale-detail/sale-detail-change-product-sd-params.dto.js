const { modelFromObject } = require("../utils");
const { isUndefinedOrNull, validateInteger } = require("../validators");

/**
 * @typedef {object} SaleDetailChangeProductSDParamsDto
 * @property {number} saleDetailId - Sale detail id, min 1.
 * @property {number} newProductId - Product id, min 1.
 */

class SaleDetailChangeProductSDParamsDtoModel {
    /**
     * SaleDetail id, min 1
     * @type {number}
     */
    saleDetailId;

    /**
     * New product id, min 1
     * @type {number}
     */
    newProductId;

    /**
     * Creates a model from dto
     * @param {SaleDetailChangeProductSDParamsDto} dto - Dto
     * @returns {SaleDetailChangeProductSDParamsDtoModel}
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
            case "saleDetailId":
                this.saleDetailId = validateInteger(
                    this.saleDetailId,
                    "saleDetailId",
                    "el id del detalle de venta",
                    {
                        min: 1,
                    }
                );
                break;
            case "newProductId":
                this.newProductId = validateInteger(
                    this.newProductId,
                    "newProductId",
                    "el id del nuevo producto",
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

module.exports = {
    SaleDetailChangeProductSDParamsDtoModel,
};
