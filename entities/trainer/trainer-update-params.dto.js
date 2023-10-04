const { modelFromObject } = require("../utils");
const { ValidationError } = require("../common/validation.error");
const {
    isUndefinedOrNull,
    validateString,
    isUndefined,
    validateInteger,
} = require("../validators");

/**
 * @typedef {object} TrainerUpdateParamsDto
 * @property {number} trainerId   - Trainer id, min 1.
 * @property {string} [name]      - Name, max 500 characteres
 */

class TrainerUpdateParamsDtoModel {
    /**
     * Trainer id, min 1
     * @type {number}
     */
    trainerId;

    /**
     *Name, max 500 characteres
     *@type {string|undefined}
     */
    name;

    /**
     * Creates model
     * @param {TrainerUpdateParamsDto} dto - Dto
     * @returns {TrainerUpdateParamsDtoModel}
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

            if (isUndefined(this.name)) {
                throw ValidationError.NoValuesToUpdate();
            }

            return;
        }

        switch (property) {
            case "trainerId":
                this.trainerId = validateInteger(
                    this.trainerId,
                    "trainerId",
                    "id del entrenador",
                    {
                        min: 1,
                    }
                );
                break;
            case "name":
                if (!isUndefined(this.name)) {
                    this.name = validateString(this.name, "name", "nombre", {
                        min: 1,
                        max: 500,
                    });
                }
                break;
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = { TrainerUpdateParamsDtoModel };
