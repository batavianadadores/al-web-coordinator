/**
 * @typedef TargetType
 * @type {('sms' | 'email')}
 */

const _TargetTypes = Object.freeze(["sms", "email"]);

/**
 * @typedef PriorityType
 * @type {('transactional' | 'marketing')}
 */

const _PriorityTypes = Object.freeze(["transactional", "marketing"]);

const TargetTypeDescription = Object.freeze({
    sms: "SMS",
    email: "Correo electrónico",
});

const PriorityTypeDescription = Object.freeze({
    transactional: "Transaccional",
    marketing: "Marketing",
});

module.exports = {
    TargetTypes: _TargetTypes,
    PriorityTypes: _PriorityTypes,
    TargetTypeDescription,
    PriorityTypeDescription,
};
