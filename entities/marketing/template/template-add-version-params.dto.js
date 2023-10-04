const { isUndefinedOrNull, validateInteger } = require("../../validators");
const { modelFromObject } = require("../../utils");

/**
 * @typedef {object} TemplateAddVersionParamsDto
 * @property {number} parentId - Parent id, min 1
 */

class TemplateAddVersionParamsDtoModel {
    /**
     * Parent id, min 1
     * @type {number}
     */
    parentId;

    /**
     * Creates a model
     * @param {TemplateAddVersionParamsDto} dto - Dto
     * @returns {TemplateAddVersionParamsDtoModel}
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
            case "parentId":
                this.parentId = validateInteger(
                    this.parentId,
                    "parentId",
                    "id de la plantilla",
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

module.exports = { TemplateAddVersionParamsDtoModel };
