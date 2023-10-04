const { isUndefinedOrNull, validateInteger } = require("../../validators");
const { modelFromObject } = require("../../utils");

/**
 * @typedef {object} TemplateDeleteParamsDto
 * @property {number} templateId - Template id, min 1
 */

class TemplateDeleteParamsDtoModel {
    /**
     * Template id, min 1
     * @type {number}
     */
    templateId;

    /**
     * Creates a model
     * @param {TemplateDeleteParamsDto} dto - Dto
     * @returns {TemplateDeleteParamsDtoModel}
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
            case "templateId":
                this.templateId = validateInteger(
                    this.templateId,
                    "templateId",
                    "id de la plantilla",
                    { min: 1 }
                );
                break;
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = { TemplateDeleteParamsDtoModel };
