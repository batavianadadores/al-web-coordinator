const { modelFromObject } = require("../utils");
const {
    isUndefinedOrNull,
    validateInteger,
    validateArray,
    validateISODateString,
} = require("../validators");

/**
 * @typedef {object} RescheduleItem
 * @property {number} lessonId - Lesson id
 * @property {number} poolId - Pool id
 * @property {string} init - Init
 */

/**
 * @typedef {object} RescheduleParamsDto
 * @property {RescheduleItem[]} items - Items
 * @property {number[]} [docIds] - Document ids
 */

class RescheduleParamsDtoModel {
    /**
     * Student id, min 1
     * @type {RescheduleItem[]}
     */
    items;

    /**
     * Document ids, min 1
     * @type {number[]|undefined}
     */
    docIds;

    /**
     * Creates a model from dto
     * @param {RescheduleParamsDto} dto - Dto
     * @returns {RescheduleParamsDtoModel}
     */
    static fromDto = (dto) => {
        return modelFromObject(dto, this);
    };

    /**
     * Validate a property of the object, or all if not parameter is passed.
     * Throws a validation error in case validation fails
     * @param {string|undefined} property - Property to validate
     * @returns {void}
     */
    validate(property) {
        if (isUndefinedOrNull(property)) {
            for (const key in this) {
                if (Object.hasOwnProperty.call(this, key)) {
                    this.validate(key);
                }
            }
            return;
        }

        switch (property) {
            case "items":
                this.items = validateArray(
                    this.items,
                    "items",
                    "clases a reprogramar",
                    {
                        canBeEmpty: false,
                    }
                );

                for (const item of this.items) {
                    validateInteger(
                        item.lessonId,
                        "lessonId",
                        "el id de la clase",
                        {
                            min: 1,
                        }
                    );

                    validateInteger(
                        item.poolId,
                        "poolId",
                        "el id de la clase",
                        {
                            min: 1,
                        }
                    );

                    validateISODateString(
                        item.init,
                        "init",
                        "la fecha de inicio"
                    );
                }
                break;
            case "docIds":
                this.docIds = validateArray(
                    this.docIds,
                    "docIds",
                    "los id de los documentos",
                    { optional: true }
                );

                if (!isUndefinedOrNull(this.docIds)) {
                    for (const docId of this.docIds) {
                        validateInteger(docId, "docId", "el id del documento", {
                            min: 1,
                        });
                    }
                }
                break;
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = {
    RescheduleParamsDtoModel,
};
