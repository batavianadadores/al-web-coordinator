const { modelFromObject } = require("../../utils");
const Payment = require("../payment/payment");

/**
 * @typedef SortByField
 * @type {('name'|'fatherFamilyName'|'motherFamilyName'|'idNumber')}
 */

const SortByFields = Object.freeze({
    all: ["name", "fatherFamilyName", "motherFamilyName", "idNumber"],
    name: {
        description: "Nombre",
    },
    fatherFamilyName: {
        description: "Apellido paterno",
    },
    motherFamilyName: {
        description: "Apellido materno",
    },
    idNumber: {
        description: "Número de documento",
    },
});

/**
 * @typedef {Object} Member
 * @property {number} memberId - Member id, min 1
 * @property {number} studentId - Student id, min 1
 * @property {number} dueDay - Due day, min 1 max 31
 * @property {number} productId - Product id, min 1
 * @property {boolean} isActive - Is active
 * @property {string} createdBy - Created by, max 50 characters
 * @property {string} createdAt - Created at, date string
 * @property {string} [updatedBy] - Updated by, max 50 characters
 * @property {string} [updatedAt] - Updated at, date string
 * @property {Payment.Payment} [oldestDuePayment] - Oldest due payment
 */

class MemberModel {
    /**
     * Member id, min 1
     * @type {number}
     */
    memberId;

    /**
     * Student id, min 1
     * @type {number}
     */
    studentId;

    /**
     * Due day, min 1 max 31
     * @type {number}
     */
    dueDay;

    /**
     * Product id, min 1
     * @type {number}
     */
    productId;

    /**
     * Is active
     * @type {boolean}
     */
    isActive;

    /**
     * Created by, max 50 characters
     * @type {string}
     */
    createdBy;

    /**
     * Created at, date string
     * @type {string}
     */
    createdAt;

    /**
     * Updated by, max 50 characters
     * @type {string|undefined}
     */
    updatedBy;

    /**
     * Updated at, date string
     * @type {string|undefined}
     */
    updatedAt;

    /**
     * State
     * @type {Payment.Payment|undefined}
     */
    oldestDuePayment;

    /**
     * Creates a model
     * @param {Member} member - Member
     * @returns {MemberModel}
     */
    static fromMember = (member) => {
        return modelFromObject(member, MemberModel);
    };
}

module.exports = { MemberModel, SortByFields };
