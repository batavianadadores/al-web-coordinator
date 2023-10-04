const { isUndefinedOrNull, validateString } = require("../../validators");
const { modelFromObject } = require("../../utils");

/**
 * @typedef {object} TriggerAddParamsDto
 * @property {string} triggerId     - Trigger id, can contain letters, numbers, hyphens and underscore, min lenght 1, max lenght 40
 * @property {string} name          - Name, max 60 characteres
 * @property {string} [description] - Description, max 300 characteres
 */

class TriggerAddParamsDtoModel {
    /**
     * Trigger id, can contain letters, numbers, hyphens and underscore, min lenght 1, max lenght 40
     * @type {string}
     */
    triggerId;

    /**
     *Name, max 60 characteres
     *@type {string}
     */
    name;

    /**
     *Description, max 300 characteres
     *@type {string|undefined}
     */
    description;

    /**
     * Creates a trigger
     * @param {TriggerAddParamsDto} object - Object
     * @returns {TriggerAddParamsDtoModel}
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
            case "triggerId":
                this.triggerId = validateString(
                    this.triggerId,
                    "triggerId",
                    "id del disparador",
                    {
                        min: 1,
                        max: 40,
                        regex: /^[a-zA-Z0-9-_]{1,40}$/g,
                        regexExplanation: `puede contener letras a-z A-Z.\n
                        puede contener números 0-9.\n
                        puede contener guiónes.\n
                        puede contener guiónes bajos.`,
                    }
                );
                break;
            case "name":
                this.name = validateString(this.name, "name", "nombre", {
                    min: 1,
                    max: 60,
                });
                break;
            case "description":
                this.description = validateString(
                    this.description,
                    "description",
                    "descripción",
                    {
                        max: 300,
                        optional: true,
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

module.exports = { TriggerAddParamsDtoModel };
