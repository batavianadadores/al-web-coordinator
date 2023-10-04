const { modelFromObject } = require("../utils");
const {
    isUndefinedOrNull,
    validateInteger,
    validateDateString,
    validateArray,
} = require("../validators");

/**
 * @typedef {object} SaleDetailExtendEndDateParamsDto
 * @property {number} saleDetailId - Sale detail id, min 1
 * @property {string} endDate - End date, date string
 * @property {number[]} [docIds] - Document ids
 */

class SaleDetailExtendEndDateParamsDtoModel {
    /**
     * Sale detail id, min 1
     * @type {number}
     */
    saleDetailId;

    /**
     * End date, date string
     * @type {string}
     */
    endDate;

    /**
     * Document ids, min 1
     * @type {number[]|undefined}
     */
    docIds;

    /**

     * Creates a model from dto
     * @param {SaleDetailExtendEndDateParamsDto} dto - Dto
     * @returns {SaleDetailExtendEndDateParamsDtoModel}
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
            case "saleDetailId":
                this.saleDetailId = validateInteger(
                    this.saleDetailId,
                    "saleDetailId",
                    "el id del detalle de venta",
                    {
                        min: 1,
                    }
                );
                break;
            case "endDate":
                this.endDate = validateDateString(
                    this.endDate,
                    "endDate",
                    "la fecha de fin"
                );
                break;
            case "docIds":
                this.docIds = validateArray(
                    this.docIds,
                    "docIds",
                    "los id de los documentos",
                    { optional: true }
                );

                if (!isUndefinedOrNull(this.docIds)) {
                    for (const docId of this.docIds) {
                        validateInteger(docId, "docId", "el id del documento", {
                            min: 1,
                        });
                    }
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
    SaleDetailExtendEndDateParamsDtoModel,
};
