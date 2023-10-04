const { modelFromObject } = require("../utils");
const Trainer = require("./trainer");
const Pool = require("../pool/pool");

/**
 * @typedef {object} TrainerPool
 * @property {number} poolId                - Pool Id, min 1
 * @property {number} trainerId             - Trainer Id, min 1
 * @property {Trainer.Trainer} [trainer]    - Trainer
 * @property {Pool.Pool} [pool]             - Pool
 */

class TrainerPoolModel {
    /**
     * Pool Id
     * @type {number}
     */
    poolId;

    /**
     * Trainer Id
     * @type {number}
     */
    trainerId;

    /**
     * Trainer
     * @type {Trainer.Trainer|undefined}
     */
    trainer;

    /**
     * Pool
     * @type {Pool.Pool|undefined}
     */
    pool;

    static fromTrainerPool(trainerPool) {
        return modelFromObject(trainerPool, TrainerPoolModel);
    }
}

module.exports = { TrainerPoolModel };
