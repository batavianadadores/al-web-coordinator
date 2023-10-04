const { modelFromObject } = require("../utils");
const PaginationDtoModel = require("../common/pagination.dto");

/**
 * @typedef {PaginationDtoModel.PaginationDto} PoolListParamsDto
 */

class PoolListParamsDtoModel extends PaginationDtoModel {
    /**
     * Creates dto model from dto
     * @param {PoolListParamsDto} object - Object
     * @returns {PoolListParamsDtoModel}
     */
    static fromDto = (object) => {
        return modelFromObject(object, this);
    };
}

module.exports = { PoolListParamsDtoModel };
