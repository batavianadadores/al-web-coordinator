const { modelFromObject } = require("../utils");
const { isUndefinedOrNull, validateInteger } = require("../validators");

/**
 * @typedef {object} CarControlRemoveParamsDto
 * @property {number} carControlId  - Car control id
 */

class CarControlRemoveParamsDtoModel {
    /**
     * Car control id
     * @type {number}
     */
    carControlId;

    /**
     * Creates model
     * @param {CarControlRemoveParamsDto} dto - Dto
     * @returns {CarControlRemoveParamsDtoModel}
     */
    static fromDto = (dto) => {
        return modelFromObject(dto, this);
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
            case "carControlId":
                this.carControlId = validateInteger(
                    this.carControlId,
                    "carControlId",
                    "el id del control de auto",
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

module.exports = { CarControlRemoveParamsDtoModel };
