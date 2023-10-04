const {
    isUndefinedOrNull,
    validateInteger,
    validateStringJson,
    validateString,
    isUndefined,
    validateArray,
} = require("../../validators");
const { modelFromObject } = require("../../utils");
const { ValidationError } = require("../../common/validation.error");

/**
 * @typedef {object} TemplateUpdateParamsDto
 * @property {number} templateId - Template id, min 1
 * @property {string} [description]         - Description, max 300 characters
 * @property {string} [emailText]           - Email text
 * @property {string} [emailSubject]        - Email subject
 * @property {string} [emailDefaultData]    - Email default data, string json
 * @property {string} [emailHtml]           - Email html
 * @property {string} [smsText]             - SMS text
 * @property {string} [smsDefaultData]      - SMS default data, string json
 * @property {string[]} [attachments]       - Array of url to the files to be attached
 */

class TemplateUpdateParamsDtoModel {
    /**
     * Template id, min 1
     * @type {number}
     */
    templateId;

    /**
     * Description, max 300 characters
     * @type {string|undefined}
     */
    description;

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
     * @param {TemplateUpdateParamsDto} dto - Dto
     * @returns {TemplateUpdateParamsDtoModel}
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
                isUndefined(this.templateId) &&
                isUndefined(this.description) &&
                isUndefined(this.emailText) &&
                isUndefined(this.emailHtml) &&
                isUndefined(this.emailSubject) &&
                isUndefined(this.emailDefaultData) &&
                isUndefined(this.smsText) &&
                isUndefined(this.smsDefaultData)
            ) {
                throw ValidationError.NoValuesToUpdate();
            }

            return;
        }

        switch (property) {
            case "templateId":
                this.templateId = validateInteger(
                    this.templateId,
                    "templateId",
                    "id de la plantilla",
                    {
                        min: 1,
                    }
                );
                break;
            case "description":
                if (!isUndefined(this.description)) {
                    this.description = validateString(
                        this.description,
                        "description",
                        "descripción",
                        {
                            max: 300,
                            optional: true,
                        }
                    );
                }
                break;
            case "emailText":
            case "emailHtml":
            case "emailSubject":
            case "emailDefaultData":
                this.validateEmailContent(property);
                break;
            case "smsText":
            case "smsDefaultData":
                this.validateSMSContent(property);
                break;
            case "attachments":
                if (!isUndefined(this.attachments)) {
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
            case "emailText":
                if (!isUndefined(this.emailText)) {
                    this.emailText = validateString(
                        this.emailText,
                        "emailText",
                        "contenido del correo electrónico",
                        {
                            min: 1,
                            optional: true,
                        }
                    );
                }
            case "emailHtml":
                if (!isUndefined(this.emailHtml)) {
                    this.emailHtml = validateString(
                        this.emailHtml,
                        "emailHtml",
                        "contenido HTML del correo electrónico",
                        {
                            min: 1,
                            optional: true,
                        }
                    );
                }
                break;
            case "emailSubject":
                if (!isUndefined(this.emailSubject)) {
                    this.emailSubject = validateString(
                        this.emailSubject,
                        "emailSubject",
                        "asunto del correo electrónico"
                    );
                }
                break;
            case "emailDefaultData":
                if (!isUndefined(this.emailDefaultData)) {
                    this.emailDefaultData = validateStringJson(
                        this.emailDefaultData,
                        "emailDefaultData",
                        "datos por defecto"
                    );
                }
                break;
        }
    }

    validateSMSContent(property) {
        switch (property) {
            case "smsText":
                if (!isUndefined(this.smsText)) {
                    this.smsText = validateString(
                        this.smsText,
                        "smsText",
                        "contenido del SMS",
                        { min: 1 }
                    );
                }
                break;
            case "smsDefaultData":
                if (!isUndefined(this.smsDefaultData)) {
                    this.smsDefaultData = validateStringJson(
                        this.smsDefaultData,
                        "smsDefaultData",
                        "datos por defecto"
                    );
                }
                break;
        }
    }
}

module.exports = { TemplateUpdateParamsDtoModel };
