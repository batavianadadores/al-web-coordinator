const {
    isUndefinedOrNull,
    validateConstant,
    validateStringJson,
    validateString,
    validateArray,
} = require("../../validators");
const { modelFromObject } = require("../../utils");
const Marketing = require("../marketing");
const { ValidationError } = require("../../common/validation.error");

/**
 * @typedef {object} TemplateAddParamsDto
 * @property {string} name                  - Name, max 50 characters, can contain letters, numbers, hyphens and underscore, min lenght 1
 * @property {string} [description]         - Description, max 300 characters
 * @property {Marketing.TargetType} type    - Type
 * @property {string} [emailText]           - Email text
 * @property {string} [emailSubject]        - Email subject
 * @property {string} [emailDefaultData]    - Email default data, string json
 * @property {string} [emailHtml]           - Email html
 * @property {string} [smsText]             - SMS text
 * @property {string} [smsDefaultData]      - SMS default data, string json
 * @property {string[]} [attachments]       - Array of url to the files to be attached
 */

class TemplateAddParamsDtoModel {
    /**
     * Name, max 50 characters, can contain letters, numbers, hyphens and underscore, min lenght 1
     * @type {string}
     */
    name;

    /**
     * Description, max 300 characters
     * @type {string|undefined}
     */
    description;

    /**
     * Type
     * @type {Marketing.TargetType}
     */
    type;

    /**
     * Email text
     * @type {string|undefined}
     */
    emailText;

    /**
     * Email subject
     * @type {string|undefined}
     */
    emailSubject;

    /**
     * default data, string json
     * @type {string|undefined}
     */
    emailDefaultData;

    /**
     * Email html
     * @type {string|undefined}
     */
    emailHtml;

    /**
     * SMS text
     * @type {string|undefined}
     */
    smsText;

    /**
     * SMS default data, string json
     * @type {string|undefined}
     */
    smsDefaultData;

    /**
     * Array of url to the files to be attached
     * @type {string[]|undefined}
     */
    attachments;

    /**
     * Creates a model
     * @param {TemplateAddParamsDto} dto - Dto
     * @returns {TemplateAddParamsDtoModel}
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
            case "name":
                this.name = validateString(this.name, "name", "el nombre", {
                    min: 1,
                    max: 50,
                    regex: /^[a-zA-Z0-9-_]{1,40}$/g,
                    regexExplanation: `puede contener letras a-z A-Z.\n
                        puede contener números 0-9.\n
                        puede contener guiónes.\n
                        puede contener guiónes bajos.`,
                });
                break;
            case "description":
                this.description = validateString(
                    this.description,
                    "description",
                    "descripción",
                    {
                        max: 300,
                        optional: true,
                    }
                );
                break;
            case "type":
                this.type = validateConstant(
                    this.type,
                    Marketing.TargetTypes,
                    "type",
                    "tipo",
                    "Marketing.TargetTypes",
                    "del tipo de target"
                );
                break;
            case "emailText":
            case "emailHtml":
            case "emailSubject":
            case "emailDefaultData":
                if (this.type === "email") {
                    this.validateEmailContent(property);
                }
                break;
            case "smsText":
            case "smsDefaultData":
                if (this.type === "sms") {
                    this.validateSMSContent(property);
                }
                break;
            case "attachments":
                this.attachments = validateArray(
                    this.attachments,
                    "attachments",
                    "los archivos adjuntos",
                    { optional: true }
                );

                if (!isUndefinedOrNull(this.attachments)) {
                    for (let i = 0; i < this.attachments.length; i++) {
                        validateString(
                            this.attachments[i],
                            `attachments[${i}]`,
                            `la url del archivo adjunto #${i + 1}`,
                            {
                                min: 1,
                            }
                        );
                    }
                }

                break;
            default:
                throw new Error(
                    `Property: ${property} is not part of class ${this.constructor.name}`
                );
        }
    }

    validateEmailContent(property) {
        switch (property) {
            case "emailHtml":
            case "emailText":
                this.emailText = validateString(
                    this.emailText,
                    "emailText",
                    "el contenido del correo electrónico",
                    {
                        min: 1,
                        optional: true,
                    }
                );
                this.emailHtml = validateString(
                    this.emailHtml,
                    "emailHtml",
                    "el contenido HTML del correo electrónico",
                    {
                        min: 1,
                        optional: true,
                    }
                );
                if (
                    isUndefinedOrNull(this.emailText) &&
                    isUndefinedOrNull(this.emailHtml)
                ) {
                    const message =
                        "Should indicate email content in text or html";
                    const userMessage =
                        "Añade contenido para el correo en texto o html";
                    throw new ValidationError(message, userMessage);
                }
                break;
            case "emailSubject":
                this.emailSubject = validateString(
                    this.emailSubject,
                    "emailSubject",
                    "el asunto del correo electrónico"
                );
                break;
            case "emailDefaultData":
                this.emailDefaultData = validateStringJson(
                    this.emailDefaultData,
                    "emailDefaultData",
                    "los datos por defecto"
                );
                break;
        }
    }

    validateSMSContent(property) {
        switch (property) {
            case "smsText":
                this.smsText = validateString(
                    this.smsText,
                    "smsText",
                    "el contenido del SMS",
                    { min: 1 }
                );
                break;
            case "smsDefaultData":
                this.smsDefaultData = validateStringJson(
                    this.smsDefaultData,
                    "smsDefaultData",
                    "los datos por defecto"
                );
                break;
        }
    }
}

module.exports = { TemplateAddParamsDtoModel };
