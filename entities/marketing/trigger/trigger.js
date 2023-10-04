const { modelFromObject } = require("../../utils");

/**
 * @typedef {object} Trigger
 * @property {string} triggerId     - Trigger id, can contain letters, numbers, hyphens and underscore, min lenght 1, max lenght 40
 * @property {string} name          - Name, max 60 characters
 * @property {string} [description] - Description, max 300 characters
 */

class TriggerModel {
    /**
     *Trigger id, can contain letters, numbers, hyphens and underscore, min lenght 1, max lenght 40
     *@type {string}
     */
    triggerId;

    /**
     *Name, max 60 characters
     *@type {string}
     */
    name;

    /**
     *Description, max 300 characters
     *@type {string|undefined}
     */
    description;

    /**
     * Creates model
     * @param {Trigger} dto - Dto
     * @returns {TriggerModel}
     */
    static fromDto = (dto) => {
        return modelFromObject(dto, TriggerModel);
    };
}

module.exports = { TriggerModel };
