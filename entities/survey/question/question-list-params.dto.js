const { modelFromObject } = require("../../utils");
const { validateInteger, isUndefinedOrNull } = require("../../validators");
const PaginationDtoModel = require("../../common/pagination.dto");

/**
 * @typedef {object} QuestionListParamsDtoType
 * @property {number} surveyId - Survey id
 *
 * @typedef {PaginationDtoModel.PaginationDto & QuestionListParamsDtoType} QuestionListParamsDto
 */

class QuestionListParamsDtoModel extends PaginationDtoModel {
    /**
     * Survey id
     * @type {number}
     */
    surveyId;

    /**
     * Creates dto model from dto
     * @param {QuestionListParamsDto} object - Object
     * @returns {QuestionListParamsDtoModel}
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
            case "surveyId":
                this.surveyId = validateInteger(
                    this.surveyId,
                    "surveyId",
                    "id de la encuesta",
                    {
                        min: 1,
                    }
                );
                break;
            default:
                super.validate(property);
        }
    }
}

module.exports = { QuestionListParamsDtoModel };
