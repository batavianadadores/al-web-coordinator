const { modelFromObject } = require("../utils");
const { isUndefinedOrNull } = require("../validators");
const PaginationDtoModel = require("../common/pagination.dto");

/**
 * @typedef {object} CarControlListParamsDtoType
 *
 * @typedef {PaginationDtoModel.PaginationDto & CarControlListParamsDtoType} CarControlListParamsDto
 */

class CarControlListParamsDtoModel extends PaginationDtoModel {
    /**
     * Creates dto model from dto
     * @param {CarControlListParamsDto} object - Object
     * @returns {CarControlListParamsDtoModel}
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
            default:
                super.validate(property);
        }
    }
}

module.exports = { CarControlListParamsDtoModel };
