const { modelFromObject } = require("../../utils");
const { isUndefinedOrNull, validateInteger } = require("../../validators");

/**
 * @typedef {object} QuestionDeleteParamsDto
 * @property {number} questionId - Question id, min 1.
 */

class QuestionDeleteParamsDtoModel {
    /**
     * Question id, min 1
     * @type {number}
     */
    questionId;

    /**
     * Creates a model from dto
     * @param {QuestionDeleteParamsDto} dto - Dto
     * @returns {QuestionDeleteParamsDtoModel}
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
            case "questionId":
                this.questionId = validateInteger(
                    this.questionId,
                    "questionId",
                    "id de la pregunta",
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

module.exports = { QuestionDeleteParamsDtoModel };
