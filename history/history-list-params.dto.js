const { modelFromObject } = require("../utils");
const PaginationDtoModel = require("../common/pagination.dto");
const { validateInteger, isUndefinedOrNull } = require("../validators");

/**
 * @typedef {object} HistoryListParamsDtoType
 * @property {number} saleDetailId - Sale detail id
 *
 * @typedef {PaginationDtoModel.PaginationDto & HistoryListParamsDtoType} HistoryListParamsDto
 */

class HistoryListParamsDtoModel extends PaginationDtoModel {
    /**
     * Sale detail id
     * @type {number}
     */
    saleDetailId;

    /**
     * Creates dto model from dto
     * @param {HistoryListParamsDto} object - Object
     * @returns {HistoryListParamsDtoModel}
     */
    static fromDto = (object) => {
        return modelFromObject(object, this);
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
            case "saleDetailId":
                this.saleDetailId = validateInteger(
                    this.saleDetailId,
                    "saleDetailId",
                    "id del detalle de la venta",
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

module.exports = { HistoryListParamsDtoModel };
