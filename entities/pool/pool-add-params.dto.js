const { modelFromObject } = require("../utils");
const {
    isUndefinedOrNull,
    validateString,
    validateInteger,
} = require("../validators");

/**
 * @typedef {object} PoolAddParamsDto
 * @property {string} name          - Name, max 30 characteres
 * @property {string} [description] - Description, max 500 characteres
 * @property {string} [address]     - Address, max 500 characteres
 * @property {number} eiSerie       - Electronic invoice serie, min 1
 */

class PoolAddParamsDtoModel {
    /**
     *Name, max 30 characteres
     *@type {string}
     */
    name;

    /**
     * Description, max 500 characteres
     * @type {string|undefined}
     */
    description;

    /**
     * Address, max 500 characteres
     * @type {string|undefined}
     */
    address;

    /**
     * Electronic invoice serie, min 1
     * @type {number}
     */
    eiSerie;

    /**
     * Creates model
     * @param {PoolAddParamsDto} dto - Dto
     * @returns {PoolAddParamsDtoModel}
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
                    max: 30,
                });
                break;
            case "description":
                this.description = validateString(
                    this.description,
                    "description",
                    "descripción",
                    {
                        min: 1,
                        max: 500,
                        optional: true,
                    }
                );
                break;
            case "address":
                this.address = validateString(
                    this.address,
                    "address",
                    "dirección",
                    {
                        min: 1,
                        max: 500,
                        optional: true,
                    }
                );
                break;
            case "eiSerie":
                this.eiSerie = validateInteger(
                    this.eiSerie,
                    "eiSerie",
                    "serie para facturación electrónica",
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

module.exports = { PoolAddParamsDtoModel };
