const Student = require("./student");
const { modelFromObject } = require("../utils");
const { ValidationError } = require("../common/validation.error");
const {
    isUndefinedOrNull,
    isUndefined,
    validateBoolean,
    validateString,
    isEmail,
    validateDateString,
    validateConstant,
    validateInteger,
} = require("../validators");

/**
 * @typedef {object} StudentUpdateParamsDto
 * @property {number} studentId         - Student id
 * @property {string} [names]             - Names
 * @property {string} [motherFamilyName]  - Mother Family Name
 * @property {string} [fatherFamilyName]  - Father Family Name
 * @property {string} [idType]            - Id Type, max 10 characters
 * @property {string} [idNumber]          - Id Number, max 16 characters
 * @property {Date} [birthday]            - Birthday, default now
 * @property {string} [phoneNumber1]     - PhoneNumber 1, max 30 characters, default empty string
 * @property {string} [phoneNumber2]     - PhoneNumber 2, max 30 characters, default empty string
 * @property {string} [email]             - Email
 * @property {string} [comment]           - Comment, default empty string
 * @property {boolean} [allowInscription] - AllowInscription, default true
 * @property {boolean} [allowSms]         - Allow SMS, default true. A flag that indicates if student allows marketing communication by SMS
 * @property {boolean} [allowEmail]       - Allow Email, default true. A flag that indicates if student allows marketing communication by e-mail
 * @property {Student.Level} [level]      - Level
 */

class StudentUpdateParamsDtoModel {
    /**
     * Student id
     * @type {number}
     */
    studentId;

    /**
     * Names
     * @type {string|undefined}
     */
    names;

    /**
     * Mother Family Name
     * @type {string|undefined}
     */
    motherFamilyName;

    /**
     * Father Family Name
     * @type {string|undefined}
     */
    fatherFamilyName;

    /**
     * Id Type, max 10 characters
     * @type {IdType|undefined}
     */
    idType;

    /**
     * Id Number, max 16 characters
     * @type {string|undefined}
     */
    idNumber;

    /**
     * Birthday, default now
     * @type {string|undefined}
     */
    birthday;

    /**
     * PhoneNumber 1, max 30 characters, default empty string
     * @type {string|undefined}
     */
    phoneNumber1;

    /**
     * PhoneNumber 2, max 30 characters, default empty string
     * @type {string|undefined}
     */
    phoneNumber2;

    /**
     * Email
     * @type {string|undefined}
     */
    email;

    /**
     * Comment, default empty string
     * @type {string|undefined}
     */
    comment;

    /**
     * AllowInscription, default true
     * @type {boolean|undefined}
     */
    allowInscription;

    /**
     * Allow SMS, default true. A flag that indicates if student allows marketing communication by SMS
     * @type {boolean|undefined}
     */
    allowSms;

    /**
     * Allow Email, default true. A flag that indicates if student allows marketing communication by e-mail
     * @type {boolean|undefined}
     */
    allowEmail;

    /**
     * Level
     * @type {Student.Level|undefined}
     */
    level;

    /**
     * Creates model
     * @param {StudentUpdateParamsDto} dto - Dto
     * @returns {StudentUpdateParamsDtoModel}
     */
    static fromDto = (dto) => {
        return modelFromObject(dto, this);
    };

    /**
     * Validate a property of the object, or all if not parameter is passed.
     * Throws a validation error in case validation fails
     * @param {string} [property] - Property to validate
     * @returns {void}
     */
    validate(property) {
        if (isUndefinedOrNull(property)) {
            for (const key in this) {
                if (Object.hasOwnProperty.call(this, key)) {
                    this.validate(key);
                }
            }

            if (
                isUndefined(this.names) &&
                isUndefined(this.motherFamilyName) &&
                isUndefined(this.fatherFamilyName) &&
                isUndefined(this.idType) &&
                isUndefined(this.idNumber) &&
                isUndefined(this.birthday) &&
                isUndefined(this.phoneNumber1) &&
                isUndefined(this.phoneNumber2) &&
                isUndefined(this.email) &&
                isUndefined(this.comment) &&
                isUndefined(this.allowInscription) &&
                isUndefined(this.allowSms) &&
                isUndefined(this.allowEmail) &&
                isUndefined(this.level)
            ) {
                throw ValidationError.NoValuesToUpdate();
            }
            return;
        }

        switch (property) {
            case "studentId":
                this.studentId = validateInteger(
                    this.studentId,
                    "studentId",
                    "id del alumno",
                    {
                        min: 1,
                    }
                );
                break;
            case "names":
                if (!isUndefined(this.names)) {
                    this.names = validateString(
                        this.names,
                        "names",
                        "nombre del alumno",
                        {
                            min: 1,
                        }
                    );
                }
                break;
            case "fatherFamilyName":
                if (!isUndefined(this.fatherFamilyName)) {
                    this.fatherFamilyName = validateString(
                        this.fatherFamilyName,
                        "fatherFamilyName",
                        "apellido paterno del alumno",
                        {
                            min: 1,
                        }
                    );
                }
                break;
            case "motherFamilyName":
                if (!isUndefined(this.motherFamilyName)) {
                    this.motherFamilyName = validateString(
                        this.motherFamilyName,
                        "motherFamilyName",
                        "apellido materno del alumno",
                        {
                            min: 1,
                        }
                    );
                }
                break;
            case "idType":
                if (!isUndefined(this.idType)) {
                    this.idType = validateConstant(
                        this.idType,
                        Student.IdTypes.all,
                        "idType",
                        "tipo de documento del alumno",
                        "Student.IdTypes.all",
                        "Tipos de documento"
                    );
                }
                break;
            case "idNumber":
                if (!isUndefined(this.idNumber)) {
                    /**
                     * @type {Student.IdTypeObject}
                     */
                    const idType = Student.IdTypes[this.idType];
                    if (isUndefinedOrNull(idType)) {
                        throw ValidationError.UndefinedOrNullValue(
                            "idType",
                            "tipo de documento del alumno"
                        );
                    }

                    this.idNumber = validateString(
                        this.idNumber,
                        "idNumber",
                        "número de documento del alumno",
                        {
                            regex: idType.validator,
                            regexExplanation: idType.validatorExplanation,
                        }
                    );
                }
                break;
            case "birthday":
                if (!isUndefined(this.birthday)) {
                    this.birthday = validateDateString(
                        this.birthday,
                        "birthday",
                        "fecha de nacimiento del alumno",
                        {
                            optional: true,
                        }
                    );
                }
                break;
            case "phoneNumber1":
                if (!isUndefined(this.phoneNumber1)) {
                    this.phoneNumber1 = validateString(
                        this.phoneNumber1,
                        "phoneNumber1",
                        "teléfono 1 del alumno",
                        {
                            optional: true,
                            max: 30,
                        }
                    );
                }
                break;
            case "phoneNumber2":
                if (!isUndefined(this.phoneNumber2)) {
                    this.phoneNumber2 = validateString(
                        this.phoneNumber2,
                        "phoneNumber2",
                        "teléfono 2 del alumno",
                        {
                            optional: true,
                            max: 30,
                        }
                    );
                }
                break;
            case "email":
                if (!isUndefined(this.email)) {
                    this.email = validateString(
                        this.email,
                        "email",
                        "correo electrónico del alumno",
                        {
                            min: 1,
                        }
                    );
                    if (!isEmail(this.email)) {
                        const message = "Email is not valid";
                        const userMessage =
                            "El correo electrónico no es válido";
                        throw new ValidationError(message, userMessage);
                    }
                }
                break;
            case "comment":
                if (!isUndefined(this.comment)) {
                    this.comment = validateString(
                        this.comment,
                        "comment",
                        "comentario del alumno",
                        {
                            optional: true,
                        }
                    );
                }
                break;
            case "allowInscription":
                if (!isUndefined(this.allowInscription)) {
                    this.allowInscription = validateBoolean(
                        this.allowInscription,
                        "allowInscription",
                        "permiso de inscripción del alumno"
                    );
                }
                break;
            case "allowSms":
                if (!isUndefined(this.allowSms)) {
                    this.allowSms = validateBoolean(
                        this.allowSms,
                        "allowSms",
                        "permiso de mensajes de texto"
                    );
                }
                break;
            case "allowEmail":
                if (!isUndefined(this.allowEmail)) {
                    this.allowEmail = validateBoolean(
                        this.allowEmail,
                        "allowEmail",
                        "permiso de correo electrónico"
                    );
                }
                break;
            case "level":
                if (!isUndefined(this.level)) {
                    this.level = validateConstant(
                        this.level,
                        Student.LevelFields.all,
                        "level",
                        "el nivel del alumno",
                        "Student.LevelFields.all",
                        "Niveles", {
                            optional: true
                        }
                    );
                }
                break;
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = { StudentUpdateParamsDtoModel };
