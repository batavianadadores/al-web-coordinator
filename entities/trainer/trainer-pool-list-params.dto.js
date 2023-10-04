const { modelFromObject } = require("../utils");
const PaginationDtoModel = require("../common/pagination.dto");
const { isUndefinedOrNull, validateInteger } = require("../validators");

/**
 * @typedef {object} TrainerPoolListParamsDtoType
 * @property {number} poolId      - Pool id, min 1.
 *
 * @typedef {PaginationDtoModel.PaginationDto & TrainerPoolListParamsDtoType} TrainerPoolListParamsDto
 */

class TrainerPoolListParamsDtoModel extends PaginationDtoModel {
    /**
     * Pool id, min 1
     * @type {number}
     */
    poolId;

    /**
     * Creates model
     * @param {TrainerPoolListParamsDto} dto - Dto
     * @returns {TrainerPoolListParamsDtoModel}
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
                    "id de la piscina",
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

module.exports = { TrainerPoolListParamsDtoModel };
