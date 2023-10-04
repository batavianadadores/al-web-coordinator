const { modelFromObject } = require("../../utils");
const { isUndefinedOrNull, validateInteger } = require("../../validators");

/**
 * @typedef {object} TrainerSurveyAddParamsDto
 * @property {number} studentId - Student Id, min 1
 * @property {number} lessonId - Lesson Id, min 1
 */

class TrainerSurveyAddParamsDtoModel {
    /**
     * Student Id, min 1
     * @type {number}
     */
    studentId;

    /**
     * Lesson Id, min 1
     * @type {number}
     */
    lessonId;

    /**
     * Creates model
     * @param {TrainerSurveyAddParamsDto} dto - Dto
     * @returns {TrainerSurveyAddParamsDtoModel}
     */
    static fromDto = (dto) => {
        return modelFromObject(dto, this);
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
            case "studentId":
                this.studentId = validateInteger(
                    this.studentId,
                    "studentId",
                    "id del alumno",
                    {
                        min: 1,
                    }
                );
                break;
            case "lessonId":
                this.lessonId = validateInteger(
                    this.lessonId,
                    "lessonId",
                    "id de la clase",
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

module.exports = { TrainerSurveyAddParamsDtoModel };
