const { modelFromObject } = require("../../utils");
const PaymentAddParamsDto = require("../payment/payment-add-params.dto");
const { isUndefinedOrNull, validateArray } = require("../../validators");

/**
 * @typedef {object} PaymentAddBatchParamsDto
 * @property {PaymentAddParamsDto.PaymentAddParamsDto[]} data -  Batch data
 */
class PaymentAddBatchParamsDtoModel {
    /**
     * Batch data
     * @type {PaymentAddParamsDto.PaymentAddParamsDto[]}
     */
    data;

    /**
     * Creates model
     * @param {PaymentAddBatchParamsDto} dto - Dto
     * @returns {PaymentAddBatchParamsDtoModel}
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
            case "data":
                this.data = validateArray(this.data, "data", "data", {
                    canBeEmpty: false,
                });
                this.data.forEach((item) => {
                    const model =
                        PaymentAddParamsDto.PaymentAddParamsDtoModel.fromDto(
                            item
                        );
                    model.validate();
                });
                break;
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = { PaymentAddBatchParamsDtoModel };
