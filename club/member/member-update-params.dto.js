const { modelFromObject } = require("../../utils");
const {
    isUndefinedOrNull,
    validateInteger,
    isUndefined,
    validateBoolean,
} = require("../../validators");

/**
 * @typedef {object} MemberUpdateParamsDto
 * @property {number} memberId      - Member id
 * @property {number} [dueDay]      - Due day, min 1, max 31
 * @property {number} [productId]   - Product id
 * @property {boolean} [isActive]   - Is active
 */

class MemberUpdateParamsDtoModel {
    /**
     * Member id
     * @type {number}
     */
    memberId;

    /**
     * Due day, min 1, max 31
     * @type {number|undefined}
     */
    dueDay;

    /**
     * Product id
     * @type {number|undefined}
     */
    productId;

    /**
     * Is active
     * @type {boolean|undefined}
     */
    isActive;

    /**
     * Creates model
     * @param {MemberUpdateParamsDto} dto - Dto
     * @returns {MemberUpdateParamsDtoModel}
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
                isUndefined(this.dueDay) &&
                isUndefined(this.productId) &&
                isUndefined(this.isActive)
            ) {
                throw ValidationError.NoValuesToUpdate();
            }
            return;
        }

        switch (property) {
            case "memberId":
                this.memberId = validateInteger(
                    this.memberId,
                    "memberId",
                    "id del miembro",
                    {
                        min: 1,
                    }
                );
                break;
            case "dueDay":
                if (!isUndefined(this.dueDay)) {
                    this.dueDay = validateInteger(
                        this.dueDay,
                        "dueDay",
                        "dia de pago",
                        {
                            min: 1,
                            max: 31,
                        }
                    );
                }
                break;
            case "productId":
                if (!isUndefined(this.productId)) {
                    this.productId = validateInteger(
                        this.productId,
                        "productId",
                        "id del producto",
                        {
                            min: 1,
                        }
                    );
                }
                break;
            case "isActive":
                if (!isUndefined(this.isActive)) {
                    this.isActive = validateBoolean(
                        this.isActive,
                        "isActive",
                        "activo"
                    );
                }
                break;
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = { MemberUpdateParamsDtoModel };
