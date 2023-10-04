const { modelFromObject } = require("../../utils");
const {
    isUndefinedOrNull,
    validateInteger,
    validateString,
    validateDateString,
} = require("../../validators");

/**
 * @typedef {object} SurveyAddParamsDto
 * @property {string} title - Title
 * @property {string} description - Description
 * @property {Date} startDate - Start date
 * @property {Date} endDate - End date
 * @property {number} quota - Quota
 */

class SurveyAddParamsDtoModel {
    /**
     * Title
     * @type {string}
     */
    title;

    /**
     * Description
     * @type {string}
     */
    description;

    /**
     * Start date
     * @type {Date}
     */
    startDate;

    /**
     * End date
     * @type {Date}
     */
    endDate;

    /**
     * Quota
     * @type {number}
     */
    quota;

    /**
     * Creates model
     * @param {SurveyAddParamsDto} dto - Dto
     * @returns {SurveyAddParamsDtoModel}
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
            case "title":
                this.title = validateString(this.title, "title", "título", {
                    min: 1,
                });
                break;
            case "description":
                this.description = validateString(
                    this.description,
                    "description",
                    "descripción",
                    {
                        min: 1,
                        isoptional: true,
                    }
                );
                break;
            case "startDate":
                this.startDate = validateDateString(
                    this.startDate,
                    "startDate",
                    "Fecha de inicio",
                    {
                        isoptional: true,
                    }
                );
                break;
            case "endDate":
                this.endDate = validateDateString(
                    this.endDate,
                    "endDate",
                    "Fecha de finalización",
                    {
                        isoptional: true,
                    }
                );
                break;
            case "quota":
                this.quota = validateInteger(this.quota, "quota", "cuota", {
                    min: 1,
                    isOptional: true,
                });
                break;
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = { SurveyAddParamsDtoModel };
