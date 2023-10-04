const { modelFromObject } = require("../../utils");
const {
    isUndefinedOrNull,
    validateInteger,
    validateDateString,
} = require("../../validators");

/**
 * @typedef {object} SurveyGetReportParamsDto
 * @property {number} poolId - Pool id
 * @property {string} from - From
 * @property {string} to - To
 * @property {number} questionId - Question id
 */

class SurveyGetReportParamsDtoModel {
    /**
     * Pool id
     * @type {number}
     */
    poolId;

    /**
     * From
     * @type {string}
     */
    from;

    /**
     * To
     * @type {string}
     */
    to;

    /**
     * Question id
     * @type {number}
     */
    questionId;

    /**
     * Creates model
     * @param {SurveyGetReportParamsDto} dto - Dto
     * @returns {SurveyGetReportParamsDtoModel}
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
            case "poolId":
                this.poolId = validateInteger(
                    this.poolId,
                    "poolId",
                    "Id de la piscina",
                    {
                        min: 1,
                        optional: true,
                    }
                );
                break;
            case "from":
                this.from = validateDateString(this.from, "from", "Desde");
                break;
            case "to":
                this.to = validateDateString(this.to, "to", "Hasta");
                break;
            case "questionId":
                this.questionId = validateInteger(
                    this.questionId,
                    "questionId",
                    "questionId",
                    {
                        min: 1,
                        optional: true,
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
    SurveyGetReportParamsDtoModel,
};
