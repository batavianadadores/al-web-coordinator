const {
    isUndefinedOrNull,
    validateString,
    validateStringJson,
    validateInteger,
    validateArray,
} = require("../validators");
const { modelFromObject } = require("../utils");
const { ValidationError } = require("../common/validation.error");

/**
 * @typedef {object} EventForwardParamsDto
 * @property {string} triggerId         - Trigger id, can contain letters and numbers, min lenght 1, max lenght 40
 * @property {number} [saleId]          - Sale id
 * @property {number[]} [studentIds]    - Student ids
 */

class EventForwardParamsDtoModel {
    /**
     * Trigger id, can contain letters and numbers, min lenght 1, max lenght 40
     * @type {string}
     */
    triggerId;

    /**
     * Sale id
     * @type {number|undefined}
     */
    saleId;

    /**
     * Student ids
     * @type {number[]|undefined}
     */
    studentIds;

    /**
     * Creates a trigger
     * @param {EventForwardParamsDto} object - Object
     * @returns {EventForwardParamsDtoModel}
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

            if (
                isUndefinedOrNull(this.saleId) &&
                isUndefinedOrNull(this.studentIds)
            ) {
                throw new ValidationError(
                    "Should indicate values",
                    "Añade valores para el disparador"
                );
            }
            return;
        }

        switch (property) {
            case "triggerId":
                this.triggerId = validateString(
                    this.triggerId,
                    "triggerId",
                    "id del disparador",
                    {
                        min: 1,
                        max: 40,
                        regex: /^[a-zA-Z0-9-_]{1,40}$/g,
                        regexExplanation: `Puede contener letras a-z A-Z.
                        Puede contener números 0-9.
                        Puede contener guiónes.
                        Puede contener guiónes bajos.`,
                    }
                );
                break;
            case "saleId":
                this.saleId = validateInteger(
                    this.saleId,
                    "saleId",
                    "id de la venta",
                    {
                        min: 1,
                        optional: true,
                    }
                );
                break;
            case "studentIds":
                this.studentIds = validateArray(
                    this.studentIds,
                    "studentIds",
                    "id de los alumnos",
                    { optional: true }
                );

                if (!isUndefinedOrNull(this.studentIds)) {
                    for (let i = 0; i < this.studentIds.length; i++) {
                        validateInteger(
                            this.studentIds[i],
                            `studentIds[${i}]`,
                            `id del alumno: ${i + 1}}`,
                            {
                                min: 1,
                            }
                        );
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

module.exports = { EventForwardParamsDtoModel };
