const { modelFromObject } = require("../../utils");
const {
    isUndefinedOrNull,
    validateInteger,
    isUndefined,
    validateString,
} = require("../../validators");

/**
 * @typedef {object} TrainerSurveyUpdateParamsDto
 * @property {string} hash      - Hash
 * @property {number} trainerId - Trainer Id, min 1
 * @property {number} rate      - Rate, min 1, max 5
 * @property {string} [comment] - Comment, max 500 characters
 */

class TrainerSurveyUpdateParamsDtoModel {
    /**
     * Hash
     * @type {string}
     */
    hash;

    /**
     * Trainer Id, min 1
     * @type {number}
     */
    trainerId;

    /**
     * Rate, min 1, max 5
     * @type {number}
     */
    rate;

    /**
     * Comment, max 500 characters
     * @type {string|undefined}
     */
    comment;

    /**
     * Creates model
     * @param {TrainerSurveyUpdateParamsDto} dto - Dto
     * @returns {TrainerSurveyUpdateParamsDtoModel}
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

            if (
                isUndefined(this.name) &&
                isUndefined(this.trainerId) &&
                isUndefined(this.rate) &&
                isUndefined(this.comment)
            ) {
                throw ValidationError.NoValuesToUpdate();
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
            case "trainerId":
                this.trainerId = validateInteger(
                    this.trainerId,
                    "trainerId",
                    "id de entrenador",
                    {
                        min: 1,
                    }
                );
                break;
            case "rate":
                this.rate = validateInteger(this.rate, "rate", "calificación", {
                    min: 1,
                    max: 5,
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
                            max: 500,
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

module.exports = {
    TrainerSurveyUpdateParamsDtoModel,
};
