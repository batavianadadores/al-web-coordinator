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
    validateBoolean,
    isUndefined,
} = require("../validators");

/**
 * @typedef {object} ProductAddParamsDto
 * @property {string} name                  - Product name, max 40 characters
 * @property {string} price                 - Product price, numeric string
 * @property {string} validityFrom            - Product validity from, date string
 * @property {string} validityTo              - Product validity to, date string
 * @property {number} courseId              - Course id, min 1
 * @property {number} lessonsNumber         - Number of lessons
 * @property {boolean} canChangeSchedule    - Can change schedule
 * @property {number} lessonsPerWeek        - Lessons per week
 * @property {number} poolId                - Pool id, min 1
 * @property {boolean} showInWeb            - Show in web
 * @property {Product.State} state          - State
 * @property {boolean} isTaxExonerated      - Is tax exonerated
 */

class ProductAddParamsDtoModel {
    /**
     * Product name, max 40 characters
     * @type {string}
     */
    name;

    /**
     * Product price, numeric string
     * @type {string}
     */
    price;

    /**
     * Product validity from, date string
     * @type {string}
     */
    validityFrom;

    /**
     * Product validity to, date string
     * @type {string}
     */
    validityTo;

    /**
     * Course id, min 1
     * @type {number}
     */
    courseId;

    /**
     * Number of lessons
     * @type {number}
     */
    lessonsNumber;

    /**
     * Can change schedule
     * @type {boolean}
     */
    canChangeSchedule;

    /**
     * Lessons per week
     * @type {number}
     */
    lessonsPerWeek;

    /**
     * Pool id, min 1
     * @type {number}
     */
    poolId;

    /**
     * Show in web
     * @type {boolean}
     */
    showInWeb;

    /**
     * State
     * @type {Product.State}
     */
    state;

    /**
     * Is tax exonerated
     * @type {boolean}
     */
    isTaxExonerated;

    /**
     * Creates model
     * @param {ProductAddParamsDto} dto - Dto
     * @returns {ProductAddParamsDtoModel}
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
            case "name":
                this.name = validateString(
                    this.name,
                    "name",
                    "el nombre del producto",
                    {
                        min: 1,
                        max: 40,
                    }
                );
                break;
            case "price":
                this.price = validateDecimal(this.price, "price", "el precio");
                break;
            case "validityFrom":
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
                break;
            case "validityTo":
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
                break;
            case "courseId":
                this.courseId = validateInteger(
                    this.courseId,
                    "courseId",
                    "el id del curso",
                    { min: 1 }
                );
                break;
            case "lessonsNumber":
                this.lessonsNumber = validateInteger(
                    this.lessonsNumber,
                    "lessonsNumber",
                    "el número de clases",
                    {
                        min: 0,
                        max: 84,
                    }
                );
                break;
            case "canChangeSchedule":
                this.canChangeSchedule = validateBoolean(
                    this.canChangeSchedule,
                    "canChangeSchedule",
                    "permitir cambio de hora"
                );
                break;
            case "lessonsPerWeek":
                this.lessonsPerWeek = validateInteger(
                    this.lessonsPerWeek,
                    "lessonsPerWeek",
                    "el número de clases por semana",
                    { min: 0, max: 21 }
                );
                break;
            case "poolId":
                this.poolId = validateInteger(
                    this.poolId,
                    "poolId",
                    "el id de la piscina",
                    { min: 1 }
                );
                break;
            case "showInWeb":
                this.showInWeb = validateBoolean(
                    this.showInWeb,
                    "showInWeb",
                    "se muestra en la web"
                );
                break;
            case "state":
                this.state = validateConstant(
                    this.state,
                    Product.States.all,
                    "state",
                    "el estado",
                    "Product.States.all",
                    "Estados del producto"
                );
                break;
            case "isTaxExonerated":
                this.isTaxExonerated = validateBoolean(
                    this.isTaxExonerated,
                    "isTaxExonerated",
                    "está exonerado de impuestos",
                    {
                        optional: true,
                    }
                );
                break;
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = { ProductAddParamsDtoModel };
