const { modelFromObject } = require("../utils");
const {
    isUndefinedOrNull,
    validateInteger,
    validateArray,
} = require("../validators");

/**
 * @typedef {object} TransferParamsDto
 * @property {number[]} lessonIds - Lesson ids
 */

class TransferParamsDtoModel {
    /**
     * Lesson ids
     * @type {number[]}
     */
    lessonIds;

    /**
     * Creates a model from dto
     * @param {TransferParamsDto} dto - Dto
     * @returns {TransferParamsDtoModel}
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
            case "lessonIds":
                this.lessonIds = validateArray(
                    this.lessonIds,
                    "lessonIds",
                    "los id de las clases",
                    {
                        canBeEmpty: false,
                    }
                );

                for (const lessonId of this.lessonIds) {
                    validateInteger(lessonId, "lessonId", "el id de la clase", {
                        min: 1,
                    });
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
    TransferParamsDtoModel,
};
