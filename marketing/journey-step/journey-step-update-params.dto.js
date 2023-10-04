const { modelFromObject } = require("../../utils");
const { ValidationError } = require("../../common/validation.error");
const {
    isUndefinedOrNull,
    validateInteger,
    validateStringJson,
    validateArray,
    isUndefined,
    validateString,
    validateBoolean,
} = require("../../validators");

/**
 * @typedef {object} JourneyStepUpdateParamsDto
 * @property {number} journeyStepId     - Journey step id, min 1
 * @property {string} [name]            - Name, max 50 characters
 * @property {string} [description]     - Description, max 300 characters
 * @property {string} [templateId]      - Template id, min 1
 * @property {string} [segmentRules]    - Segment rules, string json
 * @property {string} [triggerRules]    - Trigger rules, string json
 * @property {string[]} [triggerIds]    - Trigger ids, array, each trigger id can contain letters, numbers, hyphens and underscore, min lenght 1, max lenght 40
 * @property {boolean} [isEnabled]      - Is enabled
 */

class JourneyStepUpdateParamsDtoModel {
    /**
     * Journey step id, min 1
     * @type {number}
     */
    journeyStepId;

    /**
     * name
     * @type {string|undefined} - Name, max 50 characters
     */
    name;

    /**
     * description
     * @type {string|undefined} - Description, max 300 characters
     */
    description;

    /**
     * templateId
     * @type {string|undefined} - Template id, min 1
     */
    templateId;

    /**
     * segmentRules
     * @type {string|undefined} - Segment rules, string json
     */
    segmentRules;

    /**
     * triggerRules
     * @type {string|undefined} - Trigger rules, string json
     */
    triggerRules;

    /**
     * triggerIds
     * @type {string[]|undefined} - Trigger ids, array, each trigger id can contain letters, numbers, hyphens and underscore, min lenght 1, max lenght 40
     */
    triggerIds;

    /**
     * Is enabled
     * @type {boolean|undefined}
     */
    isEnabled;

    /**
     * Creates a model
     * @param {JourneyStepUpdateParamsDto} dto - Dto
     * @returns {JourneyStepUpdateParamsDtoModel}
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
                isUndefined(this.description) &&
                isUndefined(this.templateId) &&
                isUndefined(this.segmentRules) &&
                isUndefined(this.triggerRules) &&
                isUndefined(this.triggerIds)
            ) {
                throw ValidationError.NoValuesToUpdate();
            }
            return;
        }

        switch (property) {
            case "journeyStepId":
                this.journeyStepId = validateInteger(
                    this.journeyStepId,
                    "journeyStepId",
                    "id del paso del journey",
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
            case "templateId":
                if (!isUndefined(this.templateId)) {
                    this.templateId = validateInteger(
                        this.templateId,
                        "templateId",
                        "id de la plantilla",
                        { min: 1 }
                    );
                }
                break;
            case "segmentRules":
                if (!isUndefined(this.segmentRules)) {
                    this.segmentRules = validateStringJson(
                        this.segmentRules,
                        "segmentRules",
                        "reglas del segmento",
                        { optional: true }
                    );
                }
                break;
            case "triggerRules":
                if (!isUndefined(this.triggerRules)) {
                    this.triggerRules = validateStringJson(
                        this.triggerRules,
                        "triggerRules",
                        "reglas del disparador",
                        { optional: true }
                    );
                }
                break;
            case "triggerIds":
                if (!isUndefined(this.triggerIds)) {
                    this.triggerIds = validateArray(
                        this.triggerIds,
                        "triggerIds",
                        "id de los disparadores",
                        { optional: true }
                    );

                    if (!isUndefinedOrNull(this.triggerIds)) {
                        /// Unique trigger ids
                        this.triggerIds = Array.from(new Set(this.triggerIds));

                        /// Validate each trigger id
                        for (let i = 0; i < this.triggerIds.length; i++) {
                            this.triggerIds[i] = validateString(
                                this.triggerIds[i],
                                `[triggerIds[${i}]`,
                                `id del disparador #${i + 1}`,
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
                        }
                    }
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

module.exports = { JourneyStepUpdateParamsDtoModel };
