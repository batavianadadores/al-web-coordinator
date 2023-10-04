const { modelFromObject } = require("../utils");

/**
 * @template {object} T
 * @typedef {object} Pagination
 * @property {number} totalItems    - Number of total items in the collection
 * @property {T[]} items            - Items returned, can be a portion of total items
 */

class PaginationModel {
    /**
     * Number of total items in the collection
     * @type {number}
     */
    totalItems;

    /**
     * Items returned, can be a portion of total items
     * @type {number}
     */
    items;

    /**
     * Creates a pagination model
     * @param {Pagination} object - Object
     * @returns {PaginationModel}
     */
    static fromPagination = (object) => {
        return modelFromObject(object, PaginationModel);
    };
}

module.exports = PaginationModel;
