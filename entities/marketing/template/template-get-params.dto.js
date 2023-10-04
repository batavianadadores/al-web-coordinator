const {
    isUndefinedOrNull,
    validateInteger,
    validateStringBoolean,
} = require("../../validators");
const { modelFromObject } = require("../../utils");

/**
 * @typedef {object} TemplateGetParamsDto
 * @property {number} templateId    - Template id, min 1
 * @property {boolean} [withVersions]  - With versions, if true returns template versions, apply only to parent
 */

class TemplateGetParamsDtoModel {
    /**
     * Template id, min 1
     * @type {number}
     */
    templateId;

    /**
     * With versions, if true returns template versions, apply only to parent
     * @type {boolean|undefined}
     */
    withVersions;

    /**
     * Creates a model
     * @param {TemplateGetParamsDto} dto - Dto
     * @returns {TemplateGetParamsDtoModel}
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
                    {
                        min: 1,
                    }
                );
                break;
            case "withVersions":
                this.withVersions = validateStringBoolean(
                    this.withVersions,
                    "withVersions",
                    "incluir versiones",
                    { optional: true }
                );
                break;
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = { TemplateGetParamsDtoModel };
