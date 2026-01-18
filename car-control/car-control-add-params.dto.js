const { modelFromObject } = require("../utils");
const { isUndefinedOrNull, validateString } = require("../validators");

/**
 * @typedef {object} CarControlAddParamsDto
 * @property {string} licensePlate  - License plate
 */

class CarControlAddParamsDtoModel {
    /**
     * Product name, max 6 characters
     * @type {string}
     */
    licensePlate;

    /**
     * Creates model
     * @param {CarControlAddParamsDto} dto - Dto
     * @returns {CarControlAddParamsDtoModel}
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
            case "licensePlate":
                this.licensePlate = validateString(
                    this.licensePlate,
                    "licensePlate",
                    "la placa",
                    {
                        min: 6,
                        max: 6,
                        regex: /^[a-zA-Z0-9]{6}$/,
                        regexErrorMessage:
                            "La placa debe tener 6 caracteres alfanuméricos",
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

module.exports = { CarControlAddParamsDtoModel };
