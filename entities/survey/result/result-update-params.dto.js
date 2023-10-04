const { modelFromObject } = require("../../utils");
const {
    isUndefinedOrNull,
    validateInteger,
    isUndefined,
    validateString,
} = require("../../validators");

/**
 * @typedef {object} ResultUpdateParamsDto
 * @property {number} score - Score
 * @property {string} comment - Comment
 */

class ResultUpdateParamsDtoModel {
    /**
     * Score
     * @type {number}
     */
    score;

    /**
     * Comment, max 200 characters
     * @type {string|undefined}
     */
    comment;

    /**
     * Creates model
     * @param {ResultUpdateParamsDto} dto - Dto
     * @returns {ResultUpdateParamsDtoModel}
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

            if (isUndefined(this.score) && isUndefined(this.comment)) {
                throw ValidationError.NoValuesToUpdate();
            }
            return;
        }

        switch (property) {
            case "score":
                this.score = validateInteger(this.score, "score", "puntaje", {
                    min: 1,
                });
                break;
            case "comment":
                if (!isUndefined(this.comment)) {
                    this.comment = validateString(
                        this.comment,
                        "comment",
                        "comentario",
                        {
                            min: 0,
                            max: 200,
                            optional: true,
                        }
                    );
                }
                break;
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = { ResultUpdateParamsDtoModel };
