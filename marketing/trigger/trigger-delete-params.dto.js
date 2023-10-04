const { isUndefinedOrNull, validateString } = require("../../validators");
const { modelFromObject } = require("../../utils");

/**
 * @typedef {object} TriggerDeleteParamsDto
 * @property {string} triggerId - Trigger id, can contain letters, numbers, hyphens and underscore, min lenght 1, max lenght 40
 */

class TriggerDeleteParamsDtoModel {
    /**
     * Trigger id, can contain letters, numbers, hyphens and underscore, min lenght 1, max lenght 40
     * @type {string}
     */
    triggerId;

    /**
     * Creates a trigger
     * @param {TriggerDeleteParamsDto} object - Object
     * @returns {TriggerDeleteParamsDtoModel}
     */
    static fromDto = (object) => {
        return modelFromObject(object, this);
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
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = { TriggerDeleteParamsDtoModel };
