const {
    isUndefinedOrNull,
    validateString,
    validateConstant,
} = require("../../validators");
const { modelFromObject } = require("../../utils");
const Marketing = require("../marketing");

/**
 * @typedef {object} JourneyAddParamsDto
 * @property {string} name                  - Name, max 50 characteres
 * @property {string} [description]         - Description, max 300 characteres
 * @property {Marketing.PriorityType} type  - Type
 */

class JourneyAddParamsDtoModel {
    /**
     *Type
     *@type {Marketing.PriorityType}
     */
    type;

    /**
     *Name, max 50 characteres
     *@type {string}
     */
    name;

    /**
     *Description, max 300 characteres
     *@type {string|undefined}
     */
    description;

    /**
     * Creates model
     * @param {JourneyAddParamsDto} dto - Dto
     * @returns {JourneyAddParamsDtoModel}
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
            case "type":
                this.type = validateConstant(
                    this.type,
                    Marketing.PriorityTypes,
                    "type",
                    "tipo",
                    "Marketing.PriorityTypes",
                    "del tipo de prioridad"
                );
                break;
            case "name":
                this.name = validateString(this.name, "name", "nombre", {
                    min: 1,
                    max: 50,
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

module.exports = { JourneyAddParamsDtoModel };
