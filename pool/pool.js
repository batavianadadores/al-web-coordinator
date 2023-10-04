const { modelFromObject } = require("../utils");

/**
 * @typedef {Object} Pool
 * @property {number} poolId - Pool id, min 1
 * @property {string} name - Name, max 30 characters
 * @property {string} [description] - Description
 * @property {string} [address] - Address
 * @property {number} eiSerie - Ei serie, min 1
 */

class PoolModel {
    /**
     * Pool id, min 1
     * @type {number}
     */
    poolId;

    /**
     * Name, max 30 characters
     * @type {string}
     */
    name;

    /**
     * Description
     * @type {string|undefined}
     */
    description;

    /**
     * Address
     * @type {string|undefined}
     */
    address;

    /**
     * Ei serie, min 1
     * @type {number}
     */
    eiSerie;

    /**
     * Creates a model
     * @param {Pool} pool - Pool
     * @returns {PoolModel}
     */
    static fromLesson = (lesson) => {
        return modelFromObject(lesson, PoolModel);
    };
}

module.exports = { PoolModel };
