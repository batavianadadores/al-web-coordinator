const { modelFromObject } = require("../../utils");
const { ValidationError } = require("../../common/validation.error");
const {
    isUndefinedOrNull,
    validateString,
    isUndefined,
    validateInteger,
    validateBoolean,
} = require("../../validators");

/**
 * @typedef {object} JourneyUpdateParamsDto
 * @property {string} journeyId     - Journey id, min 1.
 * @property {string} [name]        - Name, max 50 characteres
 * @property {string} [description] - Description, max 300 characteres
 * @property {boolean} [isEnabled]  - Is enabled
 */

class JourneyUpdateParamsDtoModel {
    /**
     * Journey id, min 1
     * @type {string}
     */
    journeyId;

    /**
     *Name, max 50 characteres
     *@type {string|undefined}
     */
    name;

    /**
     *Description, max 300 characteres
     *@type {string|undefined}
     */
    description;

    /**
     * Is enabled
     * @type {boolean|undefined}
     */
    isEnabled;

    /**
     * Creates model
     * @param {JourneyUpdateParamsDto} dto - Dto
     * @returns {JourneyUpdateParamsDtoModel}
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

            if (isUndefined(this.name) && isUndefined(this.description)) {
                throw ValidationError.NoValuesToUpdate();
            }

            return;
        }

        switch (property) {
            case "journeyId":
                this.journeyId = validateInteger(
                    this.journeyId,
                    "JourneyId",
                    "id del journey",
                    {
                        min: 1,
                    }
                );
                break;
            case "name":
                if (!isUndefined(this.name)) {
                    this.name = validateString(this.name, "name", "nombre", {
                        min: 1,
                        max: 50,
                    });
                }
                break;
            case "description":
                if (!isUndefined(this.description)) {
                    this.description = validateString(
                        this.description,
                        "description",
                        "descripción",
                        {
                            max: 300,
                            optional: true,
                        }
                    );
                }
                break;
            case "isEnabled":
                if (!isUndefined(this.isEnabled)) {
                    this.isEnabled = validateBoolean(
                        this.isEnabled,
                        "isEnabled",
                        "el flag: está activo"
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

module.exports = { JourneyUpdateParamsDtoModel };
