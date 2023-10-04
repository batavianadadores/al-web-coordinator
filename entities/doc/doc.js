const { modelFromObject } = require("../utils");

/**
 * @typedef {Object} Doc
 * @property {number} docId - Doc id, min 1
 * @property {string} originalName - Original name
 * @property {string} path - Location
 * @property {string} extension - Extension
 * @property {number} size - Size
 * @property {Date} createdAt - Created at
 * @property {string} createdBy - Created by
 * @property {Date} [updatedAt] - Updated at
 * @property {string} [updatedBy] - Updated by
 * @property {string} filename - Filename
 * @property {string} [mimeType] - Mime type
 * @property {string} destination - Destination
 
 */

class DocModel {
    /**
     * Doc id, min 1
     * @type {number}
     */
    docId;

    /**
     * Original name
     * @type {string}
     */
    originalName;

    /**
     * Location
     * @type {string}
     */
    location;

    /**
     * Extension
     * @type {string}
     */
    extension;

    /**
     * Size
     * @type {number}
     */
    size;

    /**
     * Created at
     * @type {string}
     */
    createdAt;

    /**
     * Created by
     * @type {string}
     */
    createdBy;

    /**
     *  Updated at
     * @type {string|undefined}
     */
    updatedAt;

    /**
     *  Updated by
     * @type {string|undefined}
     */
    updatedBy;

    /**
     * Filename
     * @type {string}
     */
    filename;

    /**
     * Mime type
     * @type {string|undefined}
     */
    mimeType;

    /**
     * Destination
     * @type {string}
     */
    destination;

    /**
     * Creates a model
     * @param {Doc} object - Object
     * @returns {PoolModel}
     */
    static fromObject = (lesson) => {
        return modelFromObject(lesson, DocModel);
    };
}

module.exports = { DocModel };
