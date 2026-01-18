const { isUndefinedOrNull } = require("../../validators");
const { modelFromObject } = require("../../utils");
const {
    validateStringBoolean,
} = require("../../../components/common/validators");

/**
 * @typedef {object} StudentLevelListParamsDto
 * @property {string|undefined} [isActive] - Is active
 *
 **/

class StudentLevelListParamsDtoModel {
    /**
     * Is active
     * @type {string|undefined}
     */
    isActive;

    /**
     * Creates dto model from dto
     * @param {StudentLevelListParamsDto} object - Object
     * @returns {StudentLevelListParamsDtoModel}
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
            case "isActive":
                this.isActive = validateStringBoolean(
                    this.isActive,
                    "isActive",
                    "Es activo",
                    {
                        optional: true,
                    }
                );
                break;
            default:
                super.validate(property);
        }
    }
}

module.exports = { StudentLevelListParamsDtoModel };
