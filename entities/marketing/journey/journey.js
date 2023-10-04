const { modelFromObject } = require("../../utils");
const Marketing = require("../marketing");
/**
 * @typedef {object} Journey
 * @property {number} journeyId             - Journey id, min 1
 * @property {string} name                  - Name, max 50 characteres
 * @property {string} [description]         - Description, max 300 characteres
 * @property {Marketing.PriorityType} type  - Type
 * @property {string} createdBy             - Created by, max 50 characters
 * @property {string} createdAt             - Created at
 * @property {string} [updatedBy]           - Updated by, max 50 characters
 * @property {string} [updatedAt]           - Updated at
 * @property {boolean} isEnabled            - Is enabled
 */

class JourneyModel {
    /**
     * Journey id, min 1
     * @type {number}
     */
    journeyId;

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
     * @type {Marketing.PriorityType}
     */
    type;

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
     * @type {string|undefined}
     */
    updatedBy;

    /**
     * Updated at
     * @type {Date|undefined}
     */
    updatedAt;

    /**
     * Is enabled
     * @type {boolean}
     */
    isEnabled;

    /**
     * Creates a journey model
     * @param {Journey} journey - Journey
     * @returns {JourneyModel}
     */
    static fromStudent = (journey) => {
        return modelFromObject(journey, JourneyModel);
    };
}

module.exports = { JourneyModel };
