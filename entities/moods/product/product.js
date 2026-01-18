const { modelFromObject } = require("../../utils");

/**
 * @typedef {object} Product
 * @property {number} productId     - Product Id
 * @property {string} name          - Product Name
 * @property {string} description   - Product Description
 * @property {string} price         - Product Price
 */

class ProductModel {
    /**
     * Product id, min 1
     * @type {number}
     */
    productId;

    /**
     * Product name, min 1, max 100
     * @type {string}
     */
    name;

    /**
     * Product description, min 1, max 500
     * @type {string}
     */
    description;

    /**
     * Product price
     * @type {string}
     */
    price;

    /**
     * Creates a product model
     * @param {Product} product - Product
     * @returns {ProductModel}
     */
    static fromProduct = (product) => {
        return modelFromObject(product, ProductModel);
    };
}

module.exports = {
    ProductModel,
};
