/**
 * @typedef {object} ScheduleDto
 * @property {number} day              - Day
 * @property {string} init             - Init
 */

const {
    validatePhoneNumber,
    validateEmail,
} = require("../../components/common/validators");
const Student = require("../student/student");
const { modelFromObject } = require("../utils");
const {
    validateInteger,
    validateISODateString,
    validateArray,
    validateString,
    validateConstant,
    isUndefinedOrNull,
} = require("../validators");

/**
 * @typedef {object} SaleOnlineAddParamsDto
 * @property {number} bonusId                   - Bonus id
 * @property {string} initDate                  - Init date
 * @property {number} poolId                    - Pool id
 * @property {number} courseId                  - Course id
 * @property {number} productId                 - Product id
 * @property {ScheduleDto[]} schedule           - Schedule
 * @property {string} studentIdType             - Student id type
 * @property {string} studentIdNumber           - Student id number
 * @property {string} studentName               - Student name
 * @property {string} studentFatherFamilyName   - Student father family name
 * @property {string} studentMotherFamilyName   - Student mother family name
 * @property {string} eiIdType                  - Electronic invoice id type
 * @property {string} eiIdNumber                - Electronic invoice id number
 * @property {string} eiEmail                   - Electronic invoice email
 * @property {string} eiPhoneNumber             - Electronic invoice phone number
 * @property {string} eiName                    - Electronic invoice name
 * @property {string} eiFatherFamilyName        - Electronic invoice father family name
 * @property {string} eiMotherFamilyName        - Electronic invoice mother family name
 */

class SaleOnlineAddParamsDtoModel {
    /**
     * Bonus id
     * @type {number}
     */
    bonusId;

    /**
     * Init date
     * @type {string}
     */
    initDate;

    /**
     * Pool id
     * @type {number}
     */
    poolId;

    /**
     * Course id
     * @type {number}
     */
    courseId;

    /**
     * Product id
     * @type {number}
     */
    productId;

    /**
     * Schedule
     * @type {ScheduleDto[]}
     */
    schedule;

    /**
     * Student id type
     * @type {string}
     */
    studentIdType;

    /**
     * Student id number
     * @type {string}
     */
    studentIdNumber;

    /**
     * Student name
     * @type {string}
     */
    studentName;

    /**
     * Student father family name
     * @type {string}
     */
    studentFatherFamilyName;

    /**
     * Student mother family name
     * @type {string}
     */
    studentMotherFamilyName;

    /**
     * Electronic invoice id type
     * @type {string}
     */
    eiIdType;

    /**
     * Electronic invoice id number
     * @type {string}
     */
    eiIdNumber;

    /**
     * Electronic invoice email
     * @type {string}
     */
    eiEmail;

    /**
     * Electronic invoice phone number
     * @type {string}
     */
    eiPhoneNumber;

    /**
     * Electronic invoice name
     * @type {string}
     */
    eiName;

    /**
     * Electronic invoice father family name
     * @type {string}
     */
    eiFatherFamilyName;

    /**
     * Electronic invoice mother family name
     * @type {string}
     */
    eiMotherFamilyName;

    /**
     * Creates a model from dto
     * @param {SaleOnlineAddParamsDto} dto - Dto
     * @returns {SaleOnlineAddParamsDtoModel}
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
            case "bonusId":
                this.bonusId = validateInteger(
                    this.bonusId,
                    "bonusId",
                    "el id del bono",
                    { min: 1, optional: true }
                );
                break;
            case "initDate":
                this.initDate = validateISODateString(
                    this.initDate,
                    "initDate",
                    "la fecha de inicio"
                );
                break;
            case "poolId":
                this.poolId = validateInteger(
                    this.poolId,
                    "poolId",
                    "el id de la piscina",
                    { min: 1 }
                );
                break;
            case "courseId":
                this.courseId = validateInteger(
                    this.courseId,
                    "courseId",
                    "el id del curso",
                    { min: 1 }
                );
                break;
            case "productId":
                this.productId = validateInteger(
                    this.productId,
                    "productId",
                    "el id del producto",
                    { min: 1 }
                );
                break;
            case "schedule":
                this.schedule = validateArray(
                    this.schedule,
                    "schedule",
                    "el horario",
                    { canBeEmpty: false }
                );
                for (const sch of this.schedule) {
                    validateInteger(sch.day, "schedule.day", "el día", {
                        min: 1,
                        max: 7,
                    });
                    validateString(
                        sch.init,
                        "schedule.init",
                        "la hora de inicio",
                        {
                            regex: /^(([0|1][0-9]|[2][0-3]):[0-5][0-9]:[0-5][0-9])-05$/g,
                            regexExplanation: "HH:MM:SS-05",
                        }
                    );
                }
                break;
            case "studentIdType":
                this.studentIdType = validateConstant(
                    this.studentIdType,
                    Student.IdTypes.all,
                    "id type",
                    "el tipo de documento del estudiante",
                    "studentIdType",
                    "tipo de documento"
                );
                break;
            case "studentIdNumber":
                this.studentIdNumber = validateString(
                    this.studentIdNumber,
                    "studentIdNumber",
                    "el número de documento del estudiante",
                    {
                        regex: /^[a-zA-Z0-9]{8,15}$/g,
                        regexExplanation: "8 a 15 dígitos",
                    }
                );
                break;
            case "studentName":
                this.studentName = validateString(
                    this.studentName,
                    "studentName",
                    "el nombre del estudiante",
                    { min: 1 }
                );
                break;
            case "studentFatherFamilyName":
                this.studentFatherFamilyName = validateString(
                    this.studentFatherFamilyName,
                    "studentFatherFamilyName",
                    "el apellido paterno del estudiante",
                    { min: 1 }
                );
                break;
            case "studentMotherFamilyName":
                this.studentMotherFamilyName = validateString(
                    this.studentMotherFamilyName,
                    "studentMotherFamilyName",
                    "el apellido materno del estudiante",
                    { min: 1 }
                );
                break;
            case "eiIdType":
                this.eiIdType = validateConstant(
                    this.eiIdType,
                    Student.IdTypes.all,
                    "id type",
                    "el tipo de documento de la factura electrónica",
                    "eiIdType",
                    "tipo de documento"
                );
                break;
            case "eiIdNumber":
                this.eiIdNumber = validateString(
                    this.eiIdNumber,
                    "eiIdNumber",
                    "el número de documento del comprobante electrónica",
                    {
                        regex: /^[a-zA-Z0-9]{8,15}$/g,
                        regexExplanation: "8 a 15 dígitos",
                    }
                );
                break;
            case "eiEmail":
                validateEmail(this.eiEmail, "eiEmail", "el correo electrónico");
                break;
            case "eiPhoneNumber":
                validatePhoneNumber(
                    this.eiPhoneNumber,
                    "eiPhoneNumber",
                    "el número de teléfono"
                );
                break;
            case "eiName":
                this.eiName = validateString(
                    this.eiName,
                    "eiName",
                    "el nombre",
                    { min: 1 }
                );
                break;
            case "eiFatherFamilyName":
                this.eiFatherFamilyName = validateString(
                    this.eiFatherFamilyName,
                    "eiFatherFamilyName",
                    "el apellido paterno",
                    { min: 1 }
                );
                break;
            case "eiMotherFamilyName":
                this.eiMotherFamilyName = validateString(
                    this.eiMotherFamilyName,
                    "eiMotherFamilyName",
                    "el apellido materno",
                    { min: 1 }
                );
                break;
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = { SaleOnlineAddParamsDtoModel };
