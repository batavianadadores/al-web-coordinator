const { modelFromObject } = require("../../utils");
const {
    isUndefinedOrNull,
    validateInteger,
    validateString,
} = require("../../validators");

/**
 * @typedef {object} MercadopagoProcessParamsDto
 * @property {string} topic - Topic
 * @property {string} id - Id
 */

class MercadopagoProcessParamsDtoModel {
    /**
     * Topic
     * @type {string}
     */
    topic;

    /**
     * Id
     * @type {string}
     */
    id;

    /**
     * Creates a model from dto
     * @param {MercadopagoProcessParamsDto} dto - Dto
     * @returns {MercadopagoProcessParamsDtoModel}
     */
    static fromDto = (dto) => {
        return modelFromObject(dto, this);
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
            case "topic":
                this.topic = validateString(this.topic, "topic", "topic");
                break;
            case "id":
                this.id = validateString(this.id, "id", "id");
                break;
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = { MercadopagoProcessParamsDtoModel };
