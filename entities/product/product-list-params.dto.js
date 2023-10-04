const { modelFromObject } = require("../utils");
const PaginationDtoModel = require("../common/pagination.dto");
const Product = require("./product");
const {
    validateInteger,
    isUndefinedOrNull,
    validateStringBoolean,
    validateConstant,
    validateCommaSeparatedIntegers,
} = require("../validators");

/**
 * @typedef {object} ProductListParamsDtoType
 * @property {number} [courseId]        - Course id, min 1
 * @property {number} [poolId]          - Pool id, min 1
 * @property {number} [months]          - Months, min 1
 * @property {number} [lessonsPerWeek]  - Lessons per week, min 1
 * @property {boolean} [all]            - All ???
 * @property {Product.State} [state]    - State
 * @property {boolean} [isValid]        - Is valid
 * @property {string} [productIds]      - Product ids
 *
 * @typedef {PaginationDtoModel.PaginationDto & ProductListParamsDtoType} ProductListParamsDto
 */

class ProductListParamsDtoModel extends PaginationDtoModel {
    /**
     * Course id, min 1
     * @type {number|undefined}
     */
    courseId;
    /**
     * Pool id, min 1
     * @type {number|undefined}
     */
    poolId;
    /**
     * Months, min 1
     * @type {number|undefined}
     */
    months;
    /**
     * Lessons per week, min 1
     * @type {number|undefined}
     */
    lessonsPerWeek;
    /**
     * All ???
     * @type {boolean|undefined}
     */
    all;
    /**
     * State
     * @type {Product.State|undefined}
     */
    state;
    /**
     * Is valid
     * @type {boolean|undefined}
     */
    isValid;
    /**
     * Product ids
     * @type {string|undefined}
     */
    productIds;

    /**
     * Creates dto model from dto
     * @param {ProductListParamsDto} object - Object
     * @returns {ProductListParamsDtoModel}
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
            case "courseId":
                this.courseId = validateInteger(
                    this.courseId,
                    "courseId",
                    "id del curso",
                    {
                        min: 1,
                        optional: true,
                    }
                );
                break;
            case "poolId":
                this.poolId = validateInteger(
                    this.poolId,
                    "poolId",
                    "id de la piscina",
                    {
                        min: 1,
                        optional: true,
                    }
                );
                break;
            case "months":
                this.months = validateInteger(
                    this.months,
                    "months",
                    "el número de meses",
                    {
                        min: 0,
                        max: 12,
                        optional: true,
                    }
                );
                break;
            case "lessonsPerWeek":
                this.lessonsPerWeek = validateInteger(
                    this.lessonsPerWeek,
                    "lessonsPerWeek",
                    "el número de clases por semana",
                    {
                        min: 0,
                        max: 21,
                        optional: true,
                    }
                );
                break;
            case "all":
                this.all = validateStringBoolean(
                    this.all,
                    "all",
                    "el flag todo",
                    { optional: true }
                );
                break;
            case "state":
                this.state = validateConstant(
                    this.state,
                    Product.States.all,
                    "state",
                    "el flag todo",
                    "Product.States.all",
                    "Estados del producto",
                    { optional: true }
                );
                break;
            case "isValid":
                this.isValid = validateStringBoolean(
                    this.isValid,
                    "isValid",
                    "el flag es válido",
                    { optional: true }
                );
                break;
            case "productIds":
                this.productIds = validateCommaSeparatedIntegers(
                    this.productIds,
                    "productIds",
                    "los ids de los productos",
                    { optional: true }
                );
                break;
            default:
                super.validate(property);
        }
    }
}

module.exports = { ProductListParamsDtoModel };
