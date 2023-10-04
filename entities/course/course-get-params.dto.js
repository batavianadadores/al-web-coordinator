const { modelFromObject } = require("../utils");
const { isUndefinedOrNull, validateInteger } = require("../validators");

/**
 * @typedef {object} CourseGetParamsDto
 * @property {number} courseId - Course id, min 1.
 */

class CourseGetParamsDtoModel {
    /**
     * Course id, min 1
     * @type {number}
     */
    courseId;

    /**
     * Creates a model from dto
     * @param {CourseGetParamsDto} dto - Dto
     * @returns {CourseGetParamsDtoModel}
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
            case "courseId":
                this.courseId = validateInteger(
                    this.courseId,
                    "courseId",
                    "el id del curso",
                    {
                        min: 1,
                    }
                );
                break;
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = { CourseGetParamsDtoModel };
