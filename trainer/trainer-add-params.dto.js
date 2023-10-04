const { modelFromObject } = require("../utils");
const { isUndefinedOrNull, validateString } = require("../validators");

/**
 * @typedef {object} TrainerAddParamsDto
 * @property {string} name                  - Name, max 500 characteres
 */

class TrainerAddParamsDtoModel {
    /**
     *Name, max 500 characteres
     *@type {string}
     */
    name;

    /**
     * Creates model
     * @param {TrainerAddParamsDto} dto - Dto
     * @returns {TrainerAddParamsDtoModel}
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
            case "name":
                this.name = validateString(this.name, "name", "nombre", {
                    min: 1,
                    max: 500,
                });
                break;
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = { TrainerAddParamsDtoModel };
