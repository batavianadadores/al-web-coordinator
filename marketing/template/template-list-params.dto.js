const Marketing = require("../marketing");
const { modelFromObject } = require("../../utils");
const PaginationDtoModel = require("../../common/pagination.dto");
const {
    isUndefinedOrNull,
    validateString,
    validateStringBoolean,
    validateConstant,
    validateCommaSeparatedIntegers,
} = require("../../validators");

/**
 * @typedef {object} TemplateListParamsDtoType
 * @property {string} [name]                  - Name, max 50 characters, can contain letters, numbers, hyphens and underscore, min lenght 1
 * @property {Marketing.TargetType} [type]    - Type
 * @property {boolean} [withVersions]         - With versions, if true returns template versions, apply only to parent
 * @property {string} [templateIds]           - Template ids
 *
 * @typedef {PaginationDtoModel.PaginationDto & TemplateListParamsDtoType} TemplateListParamsDto
 */

class TemplateListParamsDtoModel extends PaginationDtoModel {
    /**
     * Name, max 50 characters, can contain letters, numbers, hyphens and underscore, min lenght 1
     * @type {string|undefined}
     */
    name;

    /**
     * Type
     * @type {Marketing.TargetType|undefined}
     */
    type;

    /**
     * With versions, if true returns template versions, apply only to parent
     * @type {boolean|undefined}
     */
    withVersions;

    /**
     * Template ids
     * @type {string|undefined}
     */
    templateIds;

    /**
     * Creates dto model from dto
     * @param {TemplateListParamsDto} object - Object
     * @returns {TemplateListParamsDtoModel}
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
            case "name":
                this.name = validateString(this.name, "name", "el nombre", {
                    min: 1,
                    max: 50,
                    optional: true,
                    regex: /^[a-zA-Z0-9-_]{1,40}$/g,
                    regexExplanation: `puede contener letras a-z A-Z.\n
                        puede contener números 0-9.\n
                        puede contener guiónes.\n
                        puede contener guiónes bajos.`,
                });
                break;
            case "type":
                this.type = validateConstant(
                    this.type,
                    Marketing.TargetTypes,
                    "type",
                    "tipo",
                    "Marketing.TargetTypes",
                    "del tipo de target",
                    { optional: true }
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
            case "templateIds":
                this.templateIds = validateCommaSeparatedIntegers(
                    this.templateIds,
                    "templateIds",
                    "id de plantillas",
                    { optional: true }
                );
                break;
            default:
                super.validate(property);
        }
    }
}

module.exports = { TemplateListParamsDtoModel };
