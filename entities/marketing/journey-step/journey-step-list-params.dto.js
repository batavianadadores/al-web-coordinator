const { modelFromObject } = require("../../utils");
const PaginationDtoModel = require("../../common/pagination.dto");
const { isUndefinedOrNull, validateInteger } = require("../../validators");

/**
 * @typedef {object} JourneyStepListParamsDtoType
 * @property {number} journeyId - Journey id, min 1
 *
 * @typedef {PaginationDtoModel.PaginationDto & JourneyStepListParamsDtoType} JourneyStepListParamsDto
 */

class JourneyStepListParamsDtoModel extends PaginationDtoModel {
    /**
     * Journey id, min 1
     * @type {number}
     */
    journeyId;

    /**
     * Creates dto model from dto
     * @param {JourneyStepListParamsDto} object - Object
     * @returns {JourneyStepListParamsDtoModel}
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
            case "journeyId":
                this.journeyId = validateInteger(
                    this.journeyId,
                    "JourneyId",
                    "id del journey",
                    { min: 1 }
                );
                break;
            default:
                super.validate(property);
        }
    }
}

module.exports = { JourneyStepListParamsDtoModel };
