const { modelFromObject } = require("../../utils");
const {
    isUndefinedOrNull,
    validateInteger,
    isUndefined,
    validateString,
    validateDateString,
} = require("../../validators");

/**
 * @typedef {object} SurveyUpdateParamsDto
 * @property {number} surveyId - Survey id
 * @property {string} title - Title
 * @property {string} description - Description
 * @property {string} startDate - Start date
 * @property {string} endDate - End date
 * @property {number} quota - Quota
 */

class SurveyUpdateParamsDtoModel {
    /**
     * Survey id
     * @type {number}
     */
    surveyId;

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
     * @type {string}
     */
    startDate;

    /**
     * End date
     * @type {string}
     */
    endDate;

    /**
     * Quota
     * @type {number}
     */
    quota;

    /**
     * Creates model
     * @param {SurveyUpdateParamsDto} dto - Dto
     * @returns {SurveyUpdateParamsDtoModel}
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
                isUndefined(this.surveyId) &&
                isUndefined(this.title) &&
                isUndefined(this.description) &&
                isUndefined(this.startDate) &&
                isUndefined(this.endDate) &&
                isUndefined(this.quota)
            ) {
                throw ValidationError.NoValuesToUpdate();
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
            case "title":
                if (!isUndefined(this.title)) {
                    this.title = validateString(this.title, "title", "Título", {
                        min: 0,
                        max: 50,
                    });
                }
                break;
            case "description":
                if (!isUndefined(this.description)) {
                    this.description = validateString(
                        this.description,
                        "description",
                        "Descripción",
                        {
                            min: 0,
                            max: 200,
                            optional: true,
                        }
                    );
                }
                break;
            case "startDate":
                if (!isUndefined(this.startDate)) {
                    this.startDate = validateDateString(
                        this.startDate,
                        "startDate",
                        "fecha de inicio",
                        { optional: true }
                    );
                }
                break;
            case "endDate":
                if (!isUndefined(this.startDate)) {
                    this.endDate = validateDateString(
                        this.endDate,
                        "endDate",
                        "fecha de fin",
                        { optional: true }
                    );
                }
                break;
            case "quota":
                this.quota = validateInteger(this.quota, "quota", "cuota", {
                    min: 1,
                    optional: true,
                });
                break;
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = {
    SurveyUpdateParamsDtoModel,
};
