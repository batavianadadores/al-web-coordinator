const Course = require("./course");
const { modelFromObject } = require("../utils");
const PaginationDtoModel = require("../common/pagination.dto");
const {
    validateInteger,
    isUndefinedOrNull,
    validateStringBoolean,
    validateConstant,
    validateCommaSeparatedIntegers,
} = require("../validators");

/**
 * @typedef {object} CourseListParamsDtoType
 * @property {Course.State} [status]                - Status
 * @property {boolean} [showInWeb]                  - Is valid
 * @property {string} [courseIds]                   - Product ids
 * @property {Course.CapacityType} [capacityType]   - Capacity type
 *
 * @typedef {PaginationDtoModel.PaginationDto & CourseListParamsDtoType} CourseListParamsDto
 */

class CourseListParamsDtoModel extends PaginationDtoModel {
    /**
     * Status
     * @type {Course.State}
     */
    status;

    /**
     * Is valid
     * @type {boolean}
     */
    showInWeb;

    /**
     * Product ids
     * @type {string}
     */
    courseIds;

    /**
     * Capacity type
     * @type {Course.CapacityType}
     */
    capacityType;

    /**
     * Creates dto model from dto
     * @param {CourseListParamsDto} object - Object
     * @returns {CourseListParamsDtoModel}
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
            case "status":
                this.status = validateConstant(
                    this.status,
                    Course.States.all,
                    "status",
                    "estado del curso",
                    "Course.States.all",
                    "los estados del curso",
                    { optional: true }
                );
                break;
            case "showInWeb":
                this.showInWeb = validateStringBoolean(
                    this.showInWeb,
                    "showInWeb",
                    "mostrar en web",
                    { optional: true }
                );
                break;
            case "courseIds":
                this.courseIds = validateCommaSeparatedIntegers(
                    this.courseIds,
                    "courseIds",
                    "ids de los cursos",
                    { optional: true }
                );
                break;
            case "capacityType":
                this.capacityType = validateConstant(
                    this.capacityType,
                    Course.CapacityTypes.all,
                    "capacityType",
                    "tipo de capacidad",
                    "Course.CapacityTypes.all",
                    "los tipos de capacidad",
                    { optional: true }
                );
                break;
            default:
                super.validate(property);
        }
    }
}

module.exports = { CourseListParamsDtoModel };
