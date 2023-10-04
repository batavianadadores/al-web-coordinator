const { modelFromObject } = require("../utils");
const { isUndefinedOrNull, validateInteger } = require("../validators");

/**
 * @typedef {object} PaginationDto
 * @property {number} maxResults    - Max results to be returned. Between 1 and 40. Default value 10.
 * @property {number} startIndex    - Initial index from where results are returned. Greater than or equal to 0. Default value 0.
 */

class PaginationDtoModel {
    /**
     * Max results to be returned. Between 1 and 40. Default value 10.
     * @type {number}
     */
    maxResults;

    /**
     * Initial index from where results are returned. Greater than or equal to 0. Default value 0.
     * @type {number}
     */
    startIndex;

    /**
     * Creates a pagination dto model
     * @param {PaginationDto} object - Object
     * @returns {PaginationDtoModel}
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
            case "maxResults":
                this.maxResults = validateInteger(
                    this.maxResults,
                    "maxResults",
                    "la cantidad de resultados por página",
                    { max: 40, min: 1, default: 10 }
                );
                break;
            case "startIndex":
                this.startIndex = validateInteger(
                    this.startIndex,
                    "startIndex",
                    "el número de página",
                    { min: 0, default: 0 }
                );
                break;
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = PaginationDtoModel;
