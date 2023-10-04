const { modelFromObject } = require("../utils");
const { ValidationError } = require("../common/validation.error");
const {
    validateString,
    validateDateString,
    isEmail,
    isUndefinedOrNull,
    isEmptyOrBlankSpace,
    validateCommaSeparatedIntegers,
} = require("../validators");

/**
 * @typedef IdType
 * @type {('dni'|'cde'|'ruc'|'pas'|'pdn'|'otr')}
 */

/**
 * @typedef {object} IdTypeObject
 * @property {string} description - Description
 * @property {RegExp} validator - Validator
 * @property {string} validatorExplanation - Validator explanation
 */

const _IdTypes = Object.freeze({
    all: ["dni", "cde", "ruc", "pas", "pdn", "otr"],
    dni: {
        description: "DNI",
        validator: /^[0-9]{8}$/,
        validatorExplanation: "Debe contener 8 dígitos",
    },
    cde: {
        description: "Carnet de Extranjería",
        validator: /^[a-z0-9]{1,12}$/,
        validatorExplanation:
            "Debe contener de 1 a 12 caracteres.\nSolo letras y números",
    },
    ruc: {
        description: "RUC",
        validator: /^[0-9]{11}$/,
        validatorExplanation: "Debe contener 11 dígitos",
    },
    pas: {
        description: "Pasaporte",
        validator: /^[a-z0-9]{1,12}$/,
        validatorExplanation:
            "Debe contener de 1 a 12 caracteres.\nSolo letras y números",
    },
    pdn: {
        description: "Partida de nacimiento",
        validator: /^[a-z0-9]{1,15}$/,
        validatorExplanation:
            "Debe contener de 1 a 15 caracteres.\nSolo letras y números",
    },
    otr: {
        description: "Otro",
        validator: /^[a-z0-9]{1,15}$/,
        validatorExplanation:
            "Debe contener de 1 a 15 caracteres.\nSolo letras y números",
    },
});

/**
 * @typedef SearchField
 * @type {('name'|'lastname'|'fullname'|'endDate'|'email'|'idNumber'|'billId'|'studentIds')}
 */

const _SearchFields = Object.freeze({
    all: [
        "name",
        "lastname",
        "fullname",
        "endDate",
        "email",
        "idNumber",
        "billId",
        "studentIds",
    ],
    name: {
        description: "Nombre",
        validation: (value, key, userKey) =>
            validateString(value, key, userKey, { min: 1 }),
    },
    lastname: {
        description: "Apellido",
        validation: (value, key, userKey) =>
            validateString(value, key, userKey, { min: 1 }),
    },
    fullname: {
        description: "Nombre completo",
        validation: (value, key, userKey) =>
            validateString(value, key, userKey, { min: 1 }),
    },
    endDate: {
        description: "Fecha de fin",
        validation: (value, key, userKey) =>
            validateDateString(value, key, userKey),
    },
    email: {
        description: "Correo electrónico",
        validation: (value, key, userKey) => {
            validateString(value, key, userKey, { min: 1 });
            if (!isEmail(value)) {
                const message = `The field ${key} must be a valid email`;
                const userMessage = `El campo ${userKey} debe ser un email válido`;
                throw new ValidationError(message, userMessage);
            }
        },
    },
    idNumber: {
        description: "Número de documento",
        validation: (value, key, userKey) =>
            validateString(value, key, userKey, {
                min: 1,
                regex: /^[0-9a-zA-Z]{1,15}$/g,
                regexExplanation:
                    "Debe contener de 1 a 15 caracteres.\nSolo letras y números",
            }),
    },
    billId: {
        description: "Número de boleta",
        validation: (value, key, userKey) =>
            validateString(value, key, userKey, {
                min: 1,
                regex: /^[0-9a-zA-Z-_]{1,50}$/g,
                regexExplanation:
                    "Debe contener de 1 a 50 caracteres\nSolo letras, números, guiones y guiones bajos",
            }),
    },
    studentIds: {
        description: "Id de estudiantes",
        validation: (value, key, userKey) => {
            validateCommaSeparatedIntegers(value, key, userKey);
        },
    },
});

/**
 * @typedef Level
 * @type {('no_level'|'mom_baby'|'toddler_pool'|'beginner1'|'beginner2'|'beginner3'|'intermeditate'|'intermeditate2'|'advanced'|'adults')}
 */
const _LevelFields = Object.freeze({
    all: [
        "no_level",
        "mom_baby",
        "toddler_pool",
        "beginner1",
        "beginner2",
        "beginner3",
        "intermeditate",
        "intermeditate2",
        "advanced",
        "adults",
    ],
    no_level: {
        description: "Sin nivel",
        value: "no_level",
    },
    mom_baby: {
        description: "Mamá bebé",
        value: "mom_baby",
    },
    toddler_pool: {
        description: "Patera",
        value: "toddler_pool",
    },
    beginner1: {
        description: "Principiante 1",
        value: "beginner1",
    },
    beginner2: {
        description: "Principiante 2",
        value: "beginner2",
    },
    beginner3: {
        description: "Principiante 3",
        value: "beginner3",
    },
    intermeditate: {
        description: "Intermedio 1",
        value: "intermeditate",
    },
    intermeditate2: {
        description: "Intermedio 2",
        value: "intermeditate2",
    },
    advanced: {
        description: "Avanzado",
        value: "advanced",
    },
    adults: {
        description: "Adultos",
        value: "adults",
    },
});

/**
 * @typedef {object} Student
 * @property {number} studentId         - Student Id
 * @property {number} accountId         - Account Id
 * @property {string} names             - Names
 * @property {string} motherFamilyName  - Mother Family Name
 * @property {string} fatherFamilyName  - Father Family Name
 * @property {string} idType            - Id Type, max 10 characters
 * @property {string} idNumber          - Id Number, max 16 characters
 * @property {Date} birthday            - Birthday, default now
 * @property {string} phoneNumber1     - PhoneNumber 1, max 30 characters, default empty string
 * @property {string} phoneNumber2     - PhoneNumber 2, max 30 characters, default empty string
 * @property {string} email             - Email
 * @property {string} comment           - Comment, default empty string
 * @property {boolean} allowInscription - AllowInscription, default true
 * @property {string} createdBy         - CreatedBy, max 40 characters
 * @property {Date} createdAt           - CreatedAt, default now
 * @property {boolean} cognito          - Cognito, default false. A flag that indicates if student has an account in cognito
 * @property {string} [updatedBy]       - Updated By, max 40 characters
 * @property {Date} [updatedAt]         - Updated At
 * @property {boolean} allowSms         - Allow SMS, default true. A flag that indicates if student allows marketing communication by SMS
 * @property {boolean} allowEmail       - Allow Email, default true. A flag that indicates if student allows marketing communication by e-mail
 * @property {boolean} isValidPhone1    - Is Valid Phone1, default true. A flag that indicates if student's phone number is reachable
 * @property {boolean} isValidPhone2    - Is Valid Phone2, default true. A flag that indicates if student's phone number is reachable
 * @property {boolean} isValidEmail     - Is Valid Email, default true. A flag that indicates if student's e-mail is reachable
 * @property {boolean} cognitoPassword  - Cognito Password, default false. A flag that indicates if user data or password should be updated.
 * @property {boolean} isClub           - Is Club, default false. A flag that indicates if student is a club member
 * @property {number} courseId          - Course Id, min 1
 * @property {Level} level              - Level
 * @property {boolean} isAdult          - Is Adult
 */

class StudentModel {
    /**
     * Student Id
     * @type {number}
     */
    studentId;
    /**
     * Account Id
     * @type {number}
     */
    accountId;
    /**
     * Names
     * @type {string}
     */
    names;
    /**
     * Mother Family Name
     * @type {string} motherFamilyName
     */
    motherFamilyName;
    /**
     * Father Family Name
     * @type {string}
     */
    fatherFamilyName;
    /**
     * Id Type, max 10 characters
     * @type {IdType}
     */
    idType;
    /**
     * Id Number, max 16 characters
     * @type {string}
     */
    idNumber;
    /**
     * Birthday, default now
     * @type {Date}
     */
    birthday;
    /**
     * PhoneNumber 1, max 30 characters, default empty string
     * @type {string}
     */
    phoneNumber1;
    /**
     * PhoneNumber 2, max 30 characters, default empty string
     * @type {string}
     */
    phoneNumber2;
    /**
     * Email
     * @type {string}
     */
    email;
    /**
     * Comment, default empty string
     * @type {string}
     */
    comment;
    /**
     * AllowInscription, default true
     * @type {boolean}
     */
    allowInscription;
    /**
     * CreatedBy, max 40 characters
     * @type {string}
     */
    createdBy;
    /**
     * CreatedAt, default now
     * @type {Date}
     */
    createdAt;
    /**
     * Cognito, default false. A flag that indicates if student has an account in cognito
     * @type {boolean}
     */
    cognito;
    /**
     * Updated By, max 40 characters
     * @type {string|undefined}
     */
    updatedBy;
    /**
     * Updated At
     * @type {Date|undefined}
     */
    updatedAt;
    /**
     * Allow SMS, default true. A flag that indicates if student allows marketing communication by SMS
     * @type {boolean}
     */
    allowSms;
    /**
     * Allow Email, default true. A flag that indicates if student allows marketing communication by e-mail
     * @type {boolean}
     */
    allowEmail;
    /**
     * Is Valid Phone1, default true. A flag that indicates if student's phone number is reachable
     * @type {boolean}
     */
    isValidPhone1;
    /**
     * Is Valid Phone2, default true. A flag that indicates if student's phone number is reachable
     * @type {boolean}
     */
    isValidPhone2;
    /**
     * Is Valid Email, default true. A flag that indicates if student's e-mail is reachable
     * @type {boolean}
     */
    isValidEmail;
    /**
     * Cognito Password, default false. A flag that indicates if user data or password should be updated.
     * @type {boolean}
     */
    cognitoPassword;
    /**
     * Is Club, default false. A flag that indicates if student is a club member
     * @type {boolean}
     */
    isClub;
    /**
     * Course Id, min 1
     * @type {number}
     */
    courseId;

    /**
     * Is adult
     * @type {boolean}
     */
    isAdult;

    /**
     * Creates a student model
     * @param {Student} student - Student
     * @returns {StudentModel}
     */
    static fromStudent = (student) => {
        return modelFromObject(student, StudentModel);
    };

    get phoneNumber1ForSMS() {
        return `+51${this.phoneNumber1}`;
    }

    get phoneNumber2ForSMS() {
        return `+51${this.phoneNumber2}`;
    }

    get fullname() {
        const names = [this.names];
        if (
            !isUndefinedOrNull(this.fatherFamilyName) &&
            !isEmptyOrBlankSpace(this.fatherFamilyName)
        ) {
            names.push(this.fatherFamilyName);
        }
        if (
            !isUndefinedOrNull(this.motherFamilyName) &&
            !isEmptyOrBlankSpace(this.motherFamilyName)
        ) {
            names.push(this.motherFamilyName);
        }
        return names.join(" ");
    }

    get fullId() {
        return `${_IdTypes?.[this.idType]?.description ?? "-"}: ${
            this.idNumber ?? "-"
        }`;
    }
}

module.exports = {
    StudentModel,
    IdTypes: _IdTypes,
    SearchFields: _SearchFields,
    LevelFields: _LevelFields,
};
