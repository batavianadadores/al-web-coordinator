const Student = require("./student");
const { modelFromObject } = require("../utils");
const { ValidationError } = require("../common/validation.error");
const {
    isUndefinedOrNull,
    validateString,
    validateConstant,
    validateDateString,
    isEmail,
    validateInteger,
} = require("../validators");

/**
 * @typedef {object} StudentAddParamsDto
 * @property {string} names             - Names
 * @property {string} fatherFamilyName  - Father family name
 * @property {string} motherFamilyName  - Mother family name
 * @property {string} idType            - Id type
 * @property {string} idNumber          - Id number
 * @property {string} [birthday]        - Birthday
 * @property {string} [phoneNumber1]    - Phone number 1
 * @property {string} [phoneNumber2]    - Phone number 2
 * @property {string} email             - Email
 * @property {string} [comment]         - Comment
 * @property {Student.Level} level      - Level
 */

class StudentAddParamsDtoModel {
    /**
     * Names
     * @type {string}
     */
    names;

    /**
     * Father family name
     * @type {string}
     */
    fatherFamilyName;

    /**
     * Mother family name
     * @type {string}
     */
    motherFamilyName;

    /**
     * Id type
     * @type {string}
     */
    idType;

    /**
     * Id number
     * @type {string}
     */
    idNumber;

    /**
     * Birthday
     * @type {string|undefined}
     */
    birthday;

    /**
     * Phone number 1
     * @type {string|undefined}
     */
    phoneNumber1;

    /**
     * Phone number 2
     * @type {string|undefined}
     */
    phoneNumber2;

    /**
     * Email
     * @type {string}
     */
    email;

    /**
     * Comment
     * @type {string|undefined}
     */
    comment;

    /**
     * Level
     * @type {Student.Level}
     */
    level;

    /**
     * Creates model
     * @param {StudentAddParamsDto} dto - Dto
     * @returns {StudentAddParamsDtoModel}
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
            return;
        }

        switch (property) {
            case "names":
                this.names = validateString(
                    this.names,
                    "names",
                    "nombre del alumno",
                    {
                        min: 1,
                    }
                );
                break;
            case "fatherFamilyName":
                this.fatherFamilyName = validateString(
                    this.fatherFamilyName,
                    "fatherFamilyName",
                    "apellido paterno del alumno",
                    {
                        min: 1,
                    }
                );
                break;
            case "motherFamilyName":
                this.motherFamilyName = validateString(
                    this.motherFamilyName,
                    "motherFamilyName",
                    "apellido materno del alumno",
                    {
                        min: 1,
                    }
                );
                break;
            case "idType":
                this.idType = validateConstant(
                    this.idType,
                    Student.IdTypes.all,
                    "idType",
                    "tipo de documento del alumno",
                    "Student.IdTypes.all",
                    "Tipos de documento"
                );
                break;
            case "idNumber":
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
                break;
            case "birthday":
                this.birthday = validateDateString(
                    this.birthday,
                    "birthday",
                    "fecha de nacimiento del alumno",
                    {
                        optional: true,
                    }
                );
                break;
            case "phoneNumber1":
                this.phoneNumber1 = validateString(
                    this.phoneNumber1,
                    "phoneNumber1",
                    "teléfono 1 del alumno",
                    {
                        max: 30,
                        optional: true,
                    }
                );
                break;
            case "phoneNumber2":
                this.phoneNumber2 = validateString(
                    this.phoneNumber2,
                    "phoneNumber2",
                    "teléfono 2 del alumno",
                    {
                        max: 30,
                        optional: true,
                    }
                );
                break;
            case "email":
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
                    const userMessage = "El correo electrónico no es válido";
                    throw new ValidationError(message, userMessage);
                }
                break;
            case "comment":
                this.comment = validateString(
                    this.comment,
                    "comment",
                    "comentario del alumno",
                    {
                        optional: true,
                    }
                );
                break;
            case "level":
                this.level = validateConstant(
                    this.level,
                    Student.LevelFields.all,
                    "level",
                    "el nivel del alumno",
                    "Student.LevelFields.all",
                    "Niveles",
                    {
                        optional: true,
                    }
                );
                break;
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }
}

module.exports = { StudentAddParamsDtoModel };
