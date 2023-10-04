const {
    isUndefinedOrNull,
    validateInteger,
    validateConstant,
    validateStringJson,
    validateArray,
    validateString,
} = require("../../validators");
const { modelFromObject } = require("../../utils");
const Marketing = require("../marketing");

/**
 * @typedef {object} JourneyStepAddParamsDto
 * @property {string} name - Name, max 50 characters
 * @property {string} [description] - Description, max 300 characters
 * @property {Marketing.TargetType} type - Type
 * @property {string} templateId - Template id, min 1
 * @property {string} [segmentRules] - Segment rules, string json
 * @property {string} [triggerRules] - Trigger rules, string json
 * @property {string} journeyId - Journey id, min 1
 * @property {string[]} [triggerIds] - Trigger ids, array, each trigger id can contain letters, numbers, hyphens and underscore, min lenght 1, max lenght 40
 */

class JourneyStepAddParamsDtoModel {
    /**
     * name
     * @type {string} - Name, max 50 characters
     */
    name;

    /**
     * description
     * @type {string|undefined} - Description, max 300 characters
     */
    description;

    /**
     * type
     * @type {Marketing.TargetType} - Type
     */
    type;

    /**
     * templateId
     * @type {string} - Template id, min 1
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
     * journeyId
     * @type {string} - Journey id, min 1
     */
    journeyId;

    /**
     * triggerIds
     * @type {string[]|undefined} - Trigger ids, array, each trigger id can contain letters, numbers, hyphens and underscore, min lenght 1, max lenght 40
     */
    triggerIds;

    /**
     * Creates a model
     * @param {JourneyStepAddParamsDto} dto - Dto
     * @returns {JourneyStepAddParamsDtoModel}
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
                this.name = validateString(this.name, "name", "nombre", {
                    min: 1,
                    max: 50,
                });
                break;
            case "description":
                this.description = validateString(
                    this.description,
                    "description",
                    "descripción",
                    {
                        max: 300,
                        optional: true,
                    }
                );
                break;
            case "type":
                this.type = validateConstant(
                    this.type,
                    Marketing.TargetTypes,
                    "type",
                    "tipo",
                    "Marketing.TargetTypes",
                    "del tipo de target"
                );
                break;
            case "templateId":
                this.templateId = validateInteger(
                    this.templateId,
                    "templateId",
                    "id de la plantilla",
                    { min: 1 }
                );
                break;
            case "segmentRules":
                this.segmentRules = validateStringJson(
                    this.segmentRules,
                    "segmentRules",
                    "reglas del segmento",
                    { optional: true }
                );
                break;
            case "triggerRules":
                this.triggerRules = validateStringJson(
                    this.triggerRules,
                    "triggerRules",
                    "reglas del disparador",
                    { optional: true }
                );
                break;
            case "journeyId":
                this.journeyId = validateInteger(
                    this.journeyId,
                    "journeyId",
                    "id del journey",
                    { min: 1 }
                );
                break;
            case "triggerIds":
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
                break;
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = { JourneyStepAddParamsDtoModel };
