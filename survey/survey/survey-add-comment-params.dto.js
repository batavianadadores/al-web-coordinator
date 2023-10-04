const { modelFromObject } = require("../../utils");
const {
    isUndefinedOrNull,
    validateInteger,
    validateString,
} = require("../../validators");

/**
 * @typedef {object} SurveyAddCommentParamsDto
 * @property {string} hash - Hash
 * @property {number} studentId - Student id
 * @property {string} comment - Comment
 */

class SurveyAddCommentParamsDtoModel {
    /**
     * Hash
     * @type {string}
     */
    hash;

    /**
     * Student id
     * @type {number}
     */
    studentId;

    /**
     * Comment
     * @type {string}
     */
    comment;

    /**
     * Creates model
     * @param {SurveyAddCommentParamsDto} dto - Dto
     * @returns {SurveyAddCommentParamsDtoModel}
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
            case "hash":
                this.hash = validateString(this.hash, "hash", "hash", {
                    min: 1,
                    regex: /^[a-f0-9]{32}$/g,
                    regexExplanation: "Hash hexadecimal",
                });
                break;
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
            case "comment":
                this.comment = validateString(
                    this.comment,
                    "comment",
                    "Comentario",
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

module.exports = {
    SurveyAddCommentParamsDtoModel,
};
