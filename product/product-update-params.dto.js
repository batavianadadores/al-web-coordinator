const Product = require("./product");
const { modelFromObject } = require("../utils");
const { ValidationError } = require("../common/validation.error");
const {
    isUndefinedOrNull,
    validateString,
    validateConstant,
    validateDateString,
    validateDecimal,
    validateInteger,
    isUndefined,
    validateBoolean,
} = require("../validators");

/**
 * @typedef {object} ProductUpdateParamsDto
 * @property {number} productId             - Product id, min 1
 * @property {string} [name]                - Product name, max 40 characters
 * @property {string} [price]               - Product price, numeric string
 * @property {string} [validityFrom]          - Product validity from, date string
 * @property {string} [validityTo]            - Product validity to, date string
 * @property {number} [courseId]            - Course id, min 1
 * @property {number} [lessonsNumber]       - Number of lessons
 * @property {boolean} [canChangeSchedule]  - Can change schedule
 * @property {number} [lessonsPerWeek]      - Lessons per week
 * @property {number} [poolId]              - Pool id, min 1
 * @property {boolean} [showInWeb]          - Show in web
 * @property {Product.State} [state]        - State
 * @property {boolean} [isTaxExonerated]    - Is tax exonerated
 */

class ProductUpdateParamsDtoModel {
    /**
     * Product id, min 1
     * @type {number}
     */
    productId;

    /**
     * Product name, max 40 characters
     * @type {string|undefined}
     */
    name;

    /**
     * Product price, numeric string
     * @type {string|undefined}
     */
    price;

    /**
     * Product validity from, date string
     * @type {string|undefined}
     */
    validityFrom;

    /**
     * Product validity to, date string
     * @type {string|undefined}
     */
    validityTo;

    /**
     * Course id, min 1
     * @type {number|undefined}
     */
    courseId;

    /**
     * Number of lessons
     * @type {number|undefined}
     */
    lessonsNumber;

    /**
     * Can change schedule
     * @type {boolean|undefined}
     */
    canChangeSchedule;

    /**
     * Lessons per week
     * @type {number|undefined}
     */
    lessonsPerWeek;

    /**
     * Pool id, min 1
     * @type {number|undefined}
     */
    poolId;

    /**
     * Show in web
     * @type {boolean|undefined}
     */
    showInWeb;

    /**
     * State
     * @type {Product.State|undefined}
     */
    state;

    /**
     * Is tax exonerated
     * @type {boolean|undefined}
     */
    isTaxExonerated;

    /**
     * Creates model
     * @param {ProductUpdateParamsDto} dto - Dto
     * @returns {ProductUpdateParamsDtoModel}
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
                isUndefined(this.name) &&
                isUndefined(this.price) &&
                isUndefined(this.validityFrom) &&
                isUndefined(this.validityTo) &&
                isUndefined(this.courseId) &&
                isUndefined(this.lessonsNumber) &&
                isUndefined(this.canChangeSchedule) &&
                isUndefined(this.lessonsPerWeek) &&
                isUndefined(this.poolId) &&
                isUndefined(this.showInWeb) &&
                isUndefined(this.state) &&
                isUndefined(this.isTaxExonerated)
            ) {
                throw ValidationError.NoValuesToUpdate();
            }

            return;
        }

        switch (property) {
            case "productId":
                this.productId = validateInteger(
                    this.productId,
                    "productId",
                    "el id del producto",
                    { min: 1 }
                );
                break;
            case "name":
                if (!isUndefined(this.name)) {
                    this.name = validateString(
                        this.name,
                        "name",
                        "el nombre del producto",
                        {
                            min: 1,
                            max: 40,
                        }
                    );
                }
                break;
            case "price":
                if (!isUndefined(this.price)) {
                    this.price = validateDecimal(
                        this.price,
                        "price",
                        "el precio"
                    );
                }
                break;
            case "validityFrom":
                if (!isUndefined(this.validityFrom)) {
                    this.validityFrom = validateDateString(
                        this.validityFrom,
                        "validityFrom",
                        "la fecha de inicio"
                    );

                    if (!isUndefined(this.validityTo)) {
                        const validityFrom = new Date(this.validityFrom);
                        const validityTo = new Date(this.validityTo);
                        if (validityFrom.getTime() >= validityTo.getTime()) {
                            const message =
                                "Property: validityFrom is greater than validityTo";
                            const userMessage =
                                "La fecha de inicio debe ser menor que la fecha de fin";
                            throw new ValidationError(message, userMessage);
                        }
                    }
                }
                break;
            case "validityTo":
                if (!isUndefined(this.validityTo)) {
                    this.validityTo = validateDateString(
                        this.validityTo,
                        "validityTo",
                        "la fecha de fin"
                    );

                    if (!isUndefined(this.validityFrom)) {
                        const validityFrom = new Date(this.validityFrom);
                        const validityTo = new Date(this.validityTo);
                        if (validityFrom.getTime() >= validityTo.getTime()) {
                            const message =
                                "Property: validityFrom is greater than validityTo";
                            const userMessage =
                                "La fecha de inicio debe ser menor que la fecha de fin";
                            throw new ValidationError(message, userMessage);
                        }
                    }
                }
                break;
            case "courseId":
                if (!isUndefined(this.courseId)) {
                    this.courseId = validateInteger(
                        this.courseId,
                        "courseId",
                        "el id del curso",
                        { min: 1 }
                    );
                }
                break;
            case "lessonsNumber":
                if (!isUndefined(this.lessonsNumber)) {
                    this.lessonsNumber = validateInteger(
                        this.lessonsNumber,
                        "lessonsNumber",
                        "el número de clases",
                        { min: 0, max: 84 }
                    );
                }
                break;
            case "canChangeSchedule":
                if (!isUndefined(this.canChangeSchedule)) {
                    this.canChangeSchedule = validateBoolean(
                        this.canChangeSchedule,
                        "canChangeSchedule",
                        "permitir cambio de hora"
                    );
                }
                break;
            case "lessonsPerWeek":
                if (!isUndefined(this.lessonsPerWeek)) {
                    this.lessonsPerWeek = validateInteger(
                        this.lessonsPerWeek,
                        "lessonsPerWeek",
                        "el número de clases por semana",
                        { min: 0, max: 21 }
                    );
                }
                break;
            case "poolId":
                if (!isUndefined(this.poolId)) {
                    this.poolId = validateInteger(
                        this.poolId,
                        "poolId",
                        "el id de la piscina",
                        { min: 1 }
                    );
                }
                break;
            case "showInWeb":
                if (!isUndefined(this.showInWeb)) {
                    this.showInWeb = validateBoolean(
                        this.showInWeb,
                        "showInWeb",
                        "se muestra en la web"
                    );
                }
                break;
            case "state":
                if (!isUndefined(this.state)) {
                    this.state = validateConstant(
                        this.state,
                        Product.States.all,
                        "state",
                        "el estado",
                        "Product.States.all",
                        "Estados del producto"
                    );
                }
                break;
            case "isTaxExonerated":
                if (!isUndefined(this.isTaxExonerated)) {
                    this.isTaxExonerated = validateBoolean(
                        this.isTaxExonerated,
                        "isTaxExonerated",
                        "está exonerado de impuestos"
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

module.exports = { ProductUpdateParamsDtoModel };
