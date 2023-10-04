const { modelFromObject } = require("../utils");

/**
 * @typedef {object} Trainer
 * @property {number} trainerId     - Trainer Id, min 1
 * @property {string} name          - Name
 * @property {string} createdBy     - Created By
 * @property {string} createdAt       - Created At, string date
 * @property {string} [updatedBy]   - Updated By
 * @property {string} [updatedAt]     - Updated At, string date
 */

class TrainerModel {
    /**
     * Trainer Id
     * @type {number}
     */
    trainerId;

    /**
     * Name
     * @type {string}
     */
    name;

    /**
     * Created By
     * @type {string}
     */
    createdBy;

    /**
     * Created At, string date
     * @type {Date}
     */
    createdAt;

    /**
     * Updated By
     * @type {string|undefined}
     */
    updatedBy;

    /**
     * Updated At, string date
     * @type {Date|undefined}
     */
    updatedAt;

    static fromTrainer(trainer) {
        return modelFromObject(trainer, TrainerModel);
    }
}

module.exports = { TrainerModel };
