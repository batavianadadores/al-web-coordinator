const { modelFromObject } = require("../utils");

/**
 * @typedef CapacityType
 * @type { ("F"|"M"|"R") }
 */

const CapacityTypes = Object.freeze({
    all: ["F", "M", "R"],
    F: { key: "F", description: "Fijo" },
    M: { key: "M", description: "Máximo" },
    R: { key: "R", description: "Flexible" },
});

/**
 * @typedef State
 * @type { ("enabled"|"disabled") }
 */

const States = Object.freeze({
    all: ["enabled", "disabled"],
    enabled: { key: "enabled", description: "Activo" },
    disabled: { key: "disabled", description: "Inactivo" },
});

/**
 * @typedef {Object} Course
 * @property {number} courseId - Course id, min 1
 * @property {string} name - Name, max 30 characters
 * @property {string} [description] - Description
 * @property {number} [ageMin] - Age min
 * @property {number} [ageMax] - Age max
 * @property {string} status - Status, max 10 characters
 * @property {boolean} showInWeb - Show in web
 * @property {string} capacityType - Capacity type, max 1 character
 * @property {string} commercialName - Commercial name
 */

class CourseModel {
    /**
     * Course id, min 1
     * @type {number}
     */
    courseId;

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
     * Age min
     * @type {number|undefined}
     */
    ageMin;

    /**
     * Age max
     * @type {number|undefined}
     */
    ageMax;

    /**
     * Status, max 10 characters
     * @type {string}
     */
    status;

    /**
     * Show in web
     * @type {boolean}
     */
    showInWeb;

    /**
     * Capacity type, max 1 character
     * @type {string}
     */
    capacityType;

    /**
     * Commercial name
     * @type {string}
     */
    commercialName;
    
    /**
     * Creates a model from object
     * @param {Course} object - Object
     * @returns {CourseModel}
     */
    static fromObject = (object) => {
        return modelFromObject(object, CourseModel);
    };
}

module.exports = { CourseModel, States, CapacityTypes };
