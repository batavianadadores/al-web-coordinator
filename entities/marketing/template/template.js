const Marketing = require("../marketing");
const { modelFromObject } = require("../../utils");
const { isUndefinedOrNull } = require("../../validators");

/**
 * @typedef {object} Template
 * @property {number} templateId            - Template id, min 1
 * @property {number} [refId]               - Ref id, min 1
 * @property {string} [providerId]          - Provider id
 * @property {string} name                  - Name, max 50 characters, can contain letters, numbers, hyphens and underscore, min lenght 1
 * @property {string} [description]         - Description, max 300 characters
 * @property {number} version               - Version, min 1
 * @property {Marketing.TargetType} type    - Type
 * @property {boolean} isLocked             - Is locked, default false
 * @property {string} createdBy             - Created by, max 50 characters
 * @property {string} createdAt             - Created at
 * @property {string} [updatedBy]           - Updated by, max 50 characters
 * @property {string} [updatedAt]           - Update at
 * @property {string} [emailText]           - Email text
 * @property {string} [emailSubject]        - Email subject
 * @property {string} [emailDefaultData]    - Email default data, string json
 * @property {string} [emailHtml]           - Email html
 * @property {string} [smsText]             - SMS text
 * @property {string} [smsDefaultData]      - SMS default data, string json
 * @property {string[]} [attachments]       - Array of url to the files to be attached
 * @property {Template[]} versions          - Versions
 */

class TemplateModel {
    /**
     * Template id, min 1
     * @type {number}
     */
    templateId;

    /**
     * Ref id, min 1
     * @type {number|undefined}
     */
    refId;

    /**
     * Provider id
     * @type {string|undefined}
     */
    providerId;

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
     * Version, min 1
     * @type {number}
     */
    version;

    /**
     * Type
     * @type {Marketing.TargetType}
     */
    type;

    /**
     * Is locked, default false
     * @type {boolean}
     */
    isLocked;

    /**
     * Created by, max 50 characters
     * @type {string}
     */
    createdBy;

    /**
     * Created at
     * @type {string}
     */
    createdAt;

    /**
     * Updated by, max 50 characters
     * @type {string|undefined}
     */
    updatedBy;

    /**
     * Update at
     * @type {string|undefined}
     */
    updatedAt;

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
     * Versions
     * @type {TemplateModel[]}
     */
    versions;

    /**
     * Creates model
     * @param {Template} dto - Dto
     * @returns {TemplateModel}
     */
    static fromDto = (dto) => {
        const model = modelFromObject(dto, TemplateModel);
        if (!isUndefinedOrNull(dto.versions)) {
            model.versions = dto.versions.map((e) => TemplateModel.fromDto(e));
        }
        return model;
    };

    get providerName() {
        const templateName =
            this.name +
            (!isUndefinedOrNull(this.refId) ? `__v${this.version}` : "");
        return templateName;
    }
}

module.exports = { TemplateModel };
