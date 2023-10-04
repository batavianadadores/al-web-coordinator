const { modelFromObject } = require("../utils");
const { validateString, isUndefinedOrNull } = require("../validators");
const PaginationDtoModel = require("../common/pagination.dto");

/**
 * @typedef {object} TrainerListParamsDtoType
 * @property {string} [name] - Name
 *
 * @typedef {PaginationDtoModel.PaginationDto & TrainerListParamsDtoType} TrainerListParamsDto
 */

class TrainerListParamsDtoModel extends PaginationDtoModel {
    /**
     * Name
     * @type {string|undefined}
     */
    name;

    /**
     * Creates dto model from dto
     * @param {TrainerListParamsDto} object - Object
     * @returns {TrainerListParamsDtoModel}
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
            case "name":
                this.name = validateString(this.name, "name", "nombre", {
                    min: 1,
                    optional: true,
                });
                break;
            default:
                super.validate(property);
        }
    }
}

module.exports = { TrainerListParamsDtoModel };
