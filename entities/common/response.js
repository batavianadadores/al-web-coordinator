/**
 * @template T
 * @typedef {object} Response
 * @property {string} message   - Message
 * @property {T} data           - Data
 */

/**
 * Response
 * @template T
 * @class
 */
class ResponseModel {
    /**
     * message
     * @type {string}
     */
    message;

    /**
     * data
     * @type {T}
     */
    data;

    /**
     * Creates a ResponseModel with a message
     * @param {string} message - Message
     * @returns {ResponseModel}
     */
    static withMessage(message) {
        const entity = new ResponseModel();
        entity.message = message;
        return entity;
    }

    /**
     * Creates a ResponseModel with a message and data
     * @template T
     * @param {string} message - Message
     * @param {T} data - Data
     * @returns {ResponseModel<T>}
     */
    static withMessageAndData(message, data) {
        const entity = new ResponseModel();
        entity.message = message;
        entity.data = data;
        return entity;
    }

    /**
     * Creates a ResponseModel with data and a added successfully message
     * @template T
     * @param {T} data - Data
     * @returns {ResponseModel<T>}
     */
    static processedSuccesfully(data) {
        const message = "Se procesó correctamente";
        return this.withMessageAndData(message, data);
    }

    /**
     * Creates a ResponseModel with data and a added successfully message
     * @template T
     * @param {T} data - Data
     * @returns {ResponseModel<T>}
     */
    static addedSuccesfully(data) {
        const message = "Se añadió correctamente";
        return this.withMessageAndData(message, data);
    }

    /**
     * Creates a ResponseModel with a updated successfully message
     * @returns {ResponseModel}
     */
    static updatedSuccesfully() {
        const message = "Se actualizó correctamente";
        return this.withMessage(message);
    }

    /**
     * Creates a ResponseModel with a deleted successfully message
     * @returns {ResponseModel}
     */
    static deletedSuccesfully() {
        const message = "Se borró correctamente";
        return this.withMessage(message);
    }
}

module.exports = { ResponseModel };
