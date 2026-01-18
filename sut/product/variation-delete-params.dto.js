const { modelFromObject } = require("../../utils");
const { isUndefinedOrNull, validateInteger } = require("../../validators");

/**
 * @typedef {Object} VariationDeleteParamsDto
 * @property {number} variationId - Variation id
 */

class VariationDeleteParamsDtoModel {
    /**
     * Variation id
     * @type {number}
     */
    variationId;

    /**
     * Creates dto model from dto
     * @param {VariationDeleteParamsDto} object - Object
     * @returns {VariationDeleteParamsDtoModel}
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
            case "variationId":
                this.variationId = validateInteger(
                    this.variationId,
                    "variationId",
                    "el id del Variation",
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

module.exports = { VariationDeleteParamsDtoModel };
