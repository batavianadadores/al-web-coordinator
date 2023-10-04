const Marketing = require("../marketing");
const Trigger = require("../trigger/trigger");
const { modelFromObject } = require("../../utils");
const { isUndefinedOrNull } = require("../../validators");

/**
 * @typedef {object} JourneyStep
 * @property {number} journeyStepId         - Journey step id
 * @property {string} name                  - Name, max 50 characters
 * @property {string} [description]         - Description, max 300 characters
 * @property {Marketing.TargetType} type    - Type
 * @property {number} templateId            - Template id
 * @property {object} [segmentRules]        - Segment rules, string json
 * @property {object} [triggerRules]        - Trigger rules, string json
 * @property {number} journeyId             - Journey id
 * @property {string} createdBy             - Created by, max 50 characters
 * @property {string} createdAt             - Created at
 * @property {string} [updatedBy]           - Updated by, max 50 characters
 * @property {string} [updatedAt]           - Updated at
 * @property {boolean} isEnabled            - Is enabled
 * @property {Trigger.Trigger[]} triggers   - Triggers
 */

class JourneyStepModel {
    /**
     * Journey step id
     * @type {number}
     */
    journeyStepId;

    /**
     * Name, max 50 characters
     * @type {string}
     */
    name;

    /**
     * Description, max 300 characters
     * @type {string|undefined}
     */
    description;

    /**
     * Type
     * @type {Marketing.TargetType}
     */
    type;

    /**
     * Template id
     * @type {number}
     */
    templateId;

    /**
     * Segment rules, string json
     * @type {object}
     */
    segmentRules;

    /**
     * Trigger rules, string json
     * @type {object}
     */
    triggerRules;

    /**
     * Journey id
     * @type {number}
     */
    journeyId;

    /**
     * Created by, max 50 characters
     * @type {string}
     */
    createdBy;

    /**
     * Created at
     * @type {Date}
     */
    createdAt;

    /**
     * Updated by, max 50 characters
     * @type {string}
     */
    updatedBy;

    /**
     * Updated at
     * @type {Date}
     */
    updatedAt;

    /**
     * Is enabled
     * @type {boolean}
     */
    isEnabled;

    /**
     * Triggers
     * @type {Trigger.TriggerModel[]}
     */
    triggers;

    /**
     * Creates a journey step model
     * @param {JourneyStep} journeyStep - Journey step
     * @returns {JourneyStepModel}
     */
    static fromStudent = (journeyStep) => {
        const model = modelFromObject(journeyStep, JourneyStepModel);
        if (!isUndefinedOrNull(journeyStep.triggers)) {
            model.triggers = journeyStep.triggers.map((e) =>
                Trigger.TriggerModel.fromDto(e)
            );
        }
        return model;
    };
}

module.exports = { JourneyStepModel };
