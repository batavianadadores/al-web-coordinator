const { modelFromObject } = require("../../utils");
const PaginationDtoModel = require("../../common/pagination.dto");

/**
 * @typedef {PaginationDtoModel.PaginationDto} JourneyListParamsDto
 */

class JourneyListParamsDtoModel extends PaginationDtoModel {
    /**
     * Creates dto model from dto
     * @param {JourneyListParamsDto} object - Object
     * @returns {JourneyListParamsDtoModel}
     */
    static fromDto = (object) => {
        return modelFromObject(object, this);
    };
}

module.exports = { JourneyListParamsDtoModel };
