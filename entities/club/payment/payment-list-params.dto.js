const { modelFromObject } = require("../../utils");
const Payment = require("./payment");
const PaginationDtoModel = require("../../common/pagination.dto");
const {
    validateInteger,
    isUndefinedOrNull,
    validateCommaSeparatedConstant,
} = require("../../validators");

/**
 * @typedef {object} PaymentListParamsDtoType
 * @property {number} [memberId] - Member id
 * @property {string} [states] - States
 * @property {number} [year] - Year
 * @property {number} [month] - Month
 *
 * @typedef {PaginationDtoModel.PaginationDto & PaymentListParamsDtoType} PaymentListParamsDto
 */

class PaymentListParamsDtoModel extends PaginationDtoModel {
    /**
     * Member id
     * @type {number|undefined}
     */
    memberId;

    /**
     * States
     * @type {string|undefined}
     */
    states;

    /**
     * Year
     * @type {number|undefined}
     */
    year;

    /**
     * Month
     * @type {number|undefined}
     */
    month;

    /**
     * Creates dto model from dto
     * @param {PaymentListParamsDto} object - Object
     * @returns {PaymentListParamsDtoModel}
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
            case "memberId":
                this.memberId = validateInteger(
                    this.memberId,
                    "memberId",
                    "el id del miembro",
                    { min: 1, optional: true }
                );
                break;
            case "states":
                this.states = validateCommaSeparatedConstant(
                    this.states,
                    Payment.States.all,
                    "state",
                    "el estado del pago",
                    "Payment.State.all",
                    "estado de pago",
                    { optional: true }
                );
                break;
            case "year":
                this.year = validateInteger(this.year, "year", "el año", {
                    min: 2000,
                    max: 2100,
                    optional: true,
                });
                break;
            case "month":
                this.month = validateInteger(this.month, "month", "el mes", {
                    min: 1,
                    max: 12,
                    optional: true,
                });
                break;
            default:
                super.validate(property);
        }
    }
}

module.exports = { PaymentListParamsDtoModel };
