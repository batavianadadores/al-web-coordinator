const { modelFromObject } = require("../utils");
const { ValidationError } = require("../common/validation.error");
const {
    isUndefinedOrNull,
    validateString,
    isUndefined,
    validateInteger,
} = require("../validators");

/**
 * @typedef {object} PoolUpdateParamsDto
 * @property {number} poolId        - Pool id, min 1.
 * @property {string} [name]        - Name, max 30 characteres
 * @property {string} [description] - Description, max 500 characteres
 * @property {string} [address]     - Address, max 500 characteres
 * @property {number} [eiSerie]     - Electronic invoice serie, min 1
 */

class PoolUpdateParamsDtoModel {
    /**
     * Pool id, min 1.
     * @type {number}
     */
    poolId;

    /**
     * Name, max 30 characteres
     * @type {string|undefined}
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
     * @type {number|undefined}
     */
    eiSerie;

    /**
     * Creates model
     * @param {PoolUpdateParamsDto} dto - Dto
     * @returns {PoolUpdateParamsDtoModel}
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

            if (
                isUndefined(this.name) &&
                isUndefined(this.description) &&
                isUndefined(this.address) &&
                isUndefined(this.eiSerie)
            ) {
                throw ValidationError.NoValuesToUpdate();
            }

            return;
        }

        switch (property) {
            case "poolId":
                this.poolId = validateInteger(
                    this.poolId,
                    "poolId",
                    "id de la piscina",
                    {
                        min: 1,
                    }
                );
                break;
            case "name":
                if (!isUndefined(this.name)) {
                    this.name = validateString(this.name, "name", "nombre", {
                        min: 1,
                        max: 30,
                    });
                }
                break;
            case "description":
                if (!isUndefined(this.description)) {
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
                }
                break;
            case "address":
                if (!isUndefined(this.address)) {
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
                }
                break;
            case "eiSerie":
                if (!isUndefined(this.eiSerie)) {
                    this.eiSerie = validateInteger(
                        this.eiSerie,
                        "eiSerie",
                        "serie para facturación electrónica",
                        {
                            min: 1,
                        }
                    );
                }
                break;
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = { PoolUpdateParamsDtoModel };
