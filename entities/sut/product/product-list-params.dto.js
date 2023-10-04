const { modelFromObject } = require("../../utils");
const PaginationDtoModel = require("../../common/pagination.dto");
const { isUndefinedOrNull, validateInteger } = require("../../validators");

/**
 * @typedef {Object} ProductListParamsDtoType
 *
 * @typedef {PaginationDtoModel.PaginationDto & ProductListParamsDtoType} ProductListParamsDto
 */

class ProductListParamsDtoModel extends PaginationDtoModel {
    /**
     * Creates dto model from dto
     * @param {ProductListParamsDto} object - Object
     * @returns {ProductListParamsDtoModel}
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
            case "maxResults":
                this.maxResults = validateInteger(
                    this.maxResults,
                    "maxResults",
                    "la cantidad de resultados por página",
                    { max: 400, min: 1, default: 10 }
                );
                break;
            case "startIndex":
                this.startIndex = validateInteger(
                    this.startIndex,
                    "startIndex",
                    "el número de página",
                    { min: 0, default: 0 }
                );
                break;
            default:
                super.validate(property);
        }
    }
}

module.exports = { ProductListParamsDtoModel };
