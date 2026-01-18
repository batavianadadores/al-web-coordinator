const { modelFromObject } = require("../../utils");
const { validateString, isUndefinedOrNull } = require("../../validators");
const PaginationDtoModel = require("../../common/pagination.dto");

/**
 * @typedef {object} OperationNumberListParamsDtoType
 * @property {string} operationNumber - Operation number
 *
 * @typedef {PaginationDtoModel.PaginationDto & OperationNumberListParamsDtoType} OperationNumberListParamsDto
 */

class OperationNumberListParamsDtoModel extends PaginationDtoModel {
    /**
     * Operation number
     * @type {string}
     */
    operationNumber;

    /**
     * Creates dto model from dto
     * @param {OperationNumberListParamsDto} object - Object
     * @returns {OperationNumberListParamsDtoModel}
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
            case "operationNumber":
                this.operationNumber = validateString(
                    this.operationNumber,
                    "operationNumber",
                    "número de operación",
                    {
                        min: 1,
                        optional: false,
                    }
                );
                break;
            default:
                super.validate(property);
        }
    }
}

module.exports = { OperationNumberListParamsDtoModel };
