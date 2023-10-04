const Member = require("./member");
const { modelFromObject } = require("../../utils");
const Payment = require("../payment/payment");
const PaginationDtoModel = require("../../common/pagination.dto");
const {
    validateInteger,
    isUndefinedOrNull,
    validateCommaSeparatedConstant,
} = require("../../validators");

/**
 * @typedef {object} MemberListParamsDtoType
 * @property {number} [studentId] -  Student id, min 1
 * @property {string} [states] -  State
 * @property {string} [sortBy] -  Sort by, comma separated values
 *
 * @typedef {PaginationDtoModel.PaginationDto & MemberListParamsDtoType} MemberListParamsDto
 */

class MemberListParamsDtoModel extends PaginationDtoModel {
    /**
     * Student id, min 1
     * @type {number|undefined}
     */
    studentId;

    /**
     * State
     * @type {string|undefined}
     */
    states;

    /**
     * Sort by, comma separated values
     * @type {string|undefined}
     */
    sortBy;

    /**
     * Creates dto model from dto
     * @param {MemberListParamsDto} object - Object
     * @returns {MemberListParamsDtoModel}
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
            case "studentId":
                this.studentId = validateInteger(
                    this.studentId,
                    "studentId",
                    "id del alumno",
                    {
                        min: 1,
                        optional: true,
                    }
                );
                break;
            case "states":
                this.states = validateCommaSeparatedConstant(
                    this.states,
                    Payment.States.all,
                    "states",
                    "estados",
                    "Payment.States",
                    "los estados de pago",
                    { optional: true }
                );
                break;
            case "sortBy":
                this.sortBy = validateCommaSeparatedConstant(
                    this.sortBy,
                    Member.SortByFields.all,
                    "sortBy",
                    "ordenar por",
                    "Member.SortByFields.all",
                    "los campos por los que ordenar",
                    { optional: true }
                );
                break;
            default:
                super.validate(property);
        }
    }
}

module.exports = { MemberListParamsDtoModel };
