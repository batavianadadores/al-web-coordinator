const { modelFromObject } = require("../../utils");
const PaginationDtoModel = require("../../common/pagination.dto");
const { validateString, isUndefinedOrNull } = require("../../validators");

/**
 * @typedef {object} TriggerListParamsDtoType
 * @property {string} [name]    - Name, max 50 characters
 *
 * @typedef {PaginationDtoModel.PaginationDto & TriggerListParamsDtoType} TriggerListParamsDto
 */

class TriggerListParamsDtoModel extends PaginationDtoModel {
    /**
     * Name, max 50 characters
     * @type {string|undefined}
     */
    name;

    /**
     * Creates dto model from dto
     * @param {TriggerListParamsDto} object - Object
     * @returns {TriggerListParamsDtoModel}
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
                });
                break;
            default:
                super.validate(property);
        }
    }
}

module.exports = { TriggerListParamsDtoModel };
