const Student = require("./student");
const { modelFromObject } = require("../utils");
const SearchField = require("../common/search-field");
const PaginationDtoModel = require("../common/pagination.dto");
const { isUndefinedOrNull, validateConstant } = require("../validators");

/**
 * @typedef {Object} StudentListParamsDtoType
 * @property {string} [q]       - Search query
 * @property {string} [field]   - Field to search
 *
 * @typedef {PaginationDtoModel.PaginationDto & StudentListParamsDtoType} StudentListParamsDto
 */

class StudentListParamsDtoModel extends PaginationDtoModel {
    /**
     * Search query
     * @type {string|undefined}
     */
    q;

    /**
     * Field to search
     * @type {Student.SearchField|undefined}
     */
    field;

    /**
     * Creates dto model from dto
     * @param {StudentListParamsDto} object - Object
     * @returns {StudentListParamsDtoModel}
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
            case "field":
                this.field = validateConstant(
                    this.field,
                    Student.SearchFields.all,
                    "field",
                    "campo de búsqueda",
                    "Student.SearchFields.all",
                    "campos de búsqueda",
                    {
                        optional: true,
                    }
                );
                break;
            case "q":
                /**
                 * @type {SearchField.SearchFieldObject}
                 */
                const fieldObject = Student.SearchFields[this.field];
                if (
                    !isUndefinedOrNull(fieldObject) &&
                    !isUndefinedOrNull(this.field) &&
                    !isUndefinedOrNull(fieldObject)
                ) {
                    fieldObject.validation(this.q, "q", "el valor de busqueda");
                }
                break;
            default:
                super.validate(property);
        }
    }
}

module.exports = { StudentListParamsDtoModel };
