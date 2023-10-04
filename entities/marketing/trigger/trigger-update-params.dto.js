const {
    isUndefinedOrNull,
    validateString,
    isUndefined,
} = require("../../validators");
const { modelFromObject } = require("../../utils");
const { ValidationError } = require("../../common/validation.error");
/**
 * @typedef {object} TriggerUpdateParamsDto
 * @property {string} triggerId     - Trigger id, can contain letters, numbers, hyphens and underscore, min lenght 1, max lenght 40
 * @property {string} [name]        - Name, max 60 characteres
 * @property {string} [description] - Description, max 300 characteres
 */

class TriggerUpdateParamsDtoModel {
    /**
     *Trigger id, can contain letters, numbers, hyphens and underscore, min lenght 1, max lenght 40
     *@type {string}
     */
    triggerId;

    /**
     *Name, max 60 characteres
     *@type {string|undefined}
     */
    name;

    /**
     *Description, max 300 characteres
     *@type {string|undefined}
     */
    description;

    /**
     * Creates a trigger
     * @param {TriggerUpdateParamsDto} object - Object
     * @returns {TriggerUpdateParamsDtoModel}
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

            if (isUndefined(this.name) && isUndefined(this.description)) {
                throw ValidationError.NoValuesToUpdate();
            }

            return;
        }

        switch (property) {
            case "triggerId":
                this.triggerId = validateString(
                    this.triggerId,
                    "triggerId",
                    "id del disparador",
                    {
                        min: 1,
                        max: 40,
                        regex: /^[a-zA-Z0-9-_]{1,40}$/g,
                        regexExplanation: `Puede contener letras a-z A-Z.
                        Puede contener números 0-9.
                        Puede contener guiónes.
                        Puede contener guiónes bajos.`,
                    }
                );
                break;
            case "name":
                if (!isUndefined(this.name)) {
                    this.name = validateString(this.name, "name", "nombre", {
                        min: 1,
                        max: 60,
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
                            max: 300,
                            optional: true,
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

module.exports = { TriggerUpdateParamsDtoModel };
