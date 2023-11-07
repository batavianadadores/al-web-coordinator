const { DateTime } = require("luxon");
const { ValidationError } = require("./common/validation.error");

function isNull(value) {
    return value === null;
}

function isUndefined(value) {
    return value === undefined;
}

function isUndefinedOrNull(value) {
    return value === undefined || value === null;
}

function isEmptyOrBlankSpace(value) {
    if (typeof value !== "string") {
        throw new Error("Not a string");
    }

    const trimmed = value.replaceAll(/\s/g, "");
    return trimmed === "";
}

function isPhoneForSMS(value) {
    if (isUndefinedOrNull(value)) {
        return false;
    }

    if (typeof value !== "string") {
        return false;
    }
    const regex = /^\+519[0-9]{8}$/g;
    return regex.test(value);
}

function isEmail(value) {
    if (isUndefinedOrNull(value)) {
        return false;
    }

    if (typeof value !== "string") {
        return false;
    }

    const regex =
        /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/g;
    return regex.test(value);
}

function isHTTPURL(value) {
    if (isUndefinedOrNull(value)) {
        return false;
    }

    if (typeof value !== "string") {
        return false;
    }

    try {
        const url = new URL(value);
        return url.protocol.toLowerCase().includes("http");
    } catch (error) {
        return false;
    }
}

/**
 * Validates if given value is a string
 * @param {any} value - Value
 * @param {string} key - key
 * @param {string} userKey - User key
 * @param {object} opts - Options
 * @param {number|undefined} opts.max - Max string lenght
 * @param {number|undefined} opts.min - Min string lenght
 * @param {boolean} opts.optional - A flag indicating if value can be null or undefined
 * @param {RegExp|undefined} opts.regex - A flag indicating if value can be null or undefined
 * @param {string|undefined} opts.regexExplanation - A user friendly string explaining regex expression
 * @returns {string}
 */
function validateString(value, key, userKey, opts) {
    if (isUndefinedOrNull(value)) {
        if (isUndefinedOrNull(opts)) {
            throw ValidationError.UndefinedOrNullValue(key, userKey);
        }

        if (opts.optional) {
            return value;
        }

        throw ValidationError.UndefinedOrNullValue(key, userKey);
    }

    if (typeof value !== "string") {
        throw ValidationError.Incorrect(
            key,
            userKey,
            "a string",
            "cadena de texto"
        );
    }

    if (isUndefinedOrNull(opts)) {
        return value;
    }

    if (
        !isUndefinedOrNull(opts.min) &&
        typeof opts.min === "number" &&
        value.length < opts.min
    ) {
        throw new ValidationError(
            `${key} should has ${opts.min} or more characters`,
            `${userKey} debe tener ${opts.min} o más caracteres`
        );
    }

    if (
        !isUndefinedOrNull(opts.max) &&
        typeof opts.max === "number" &&
        value.length > opts.max
    ) {
        throw ValidationError.Incorrect(
            key,
            userKey,
            `less than or equal to ${opts.max}`,
            `menor o igual que ${opts.max}`
        );
    }

    if (!isUndefinedOrNull(opts.regex) && !opts.regex.test(value)) {
        throw new ValidationError(
            `${key} does not match regex: ${opts.regex.source}`,
            `${userKey} ${
                opts.regexExplanation ?? "no cumple las reglas de validación"
            }`
        );
    }

    return value;
}

/**
 * Validates if given value is an integer
 * @param {any} value - Value
 * @param {string} key - key
 * @param {string} userKey - User key
 * @param {object} opts - Options
 * @param {number|undefined} opts.max - Max value that can reach
 * @param {number|undefined} opts.min - Min value that can reach
 * @param {boolean} opts.optional - A flag indicating if value can be null or undefined
 * @param {number|undefined} opts.default - Default value, its assigned only if optional is false or undefined
 * @returns {number}
 */
function validateInteger(value, key, userKey, opts) {
    if (isUndefinedOrNull(value)) {
        if (isUndefinedOrNull(opts)) {
            throw ValidationError.UndefinedOrNullValue(key, userKey);
        }

        if (opts.optional) {
            return value;
        }

        if (isUndefinedOrNull(opts.default)) {
            throw ValidationError.UndefinedOrNullValue(key, userKey);
        }

        return opts.default;
    }

    let valueNumber = Number(value);

    if (isNaN(valueNumber) || !Number.isInteger(valueNumber)) {
        const type = "an integer value";
        const userType = "un número entero";
        throw ValidationError.Incorrect(key, userKey, type, userType);
    }

    if (isUndefinedOrNull(opts)) {
        return valueNumber;
    }

    if (
        !isUndefinedOrNull(opts.min) &&
        typeof opts.min === "number" &&
        valueNumber < opts.min
    ) {
        throw ValidationError.Incorrect(
            key,
            userKey,
            `greater than or equal to ${opts.min}`,
            `mayor o igual que ${opts.min}`
        );
    }

    if (
        !isUndefinedOrNull(opts.max) &&
        typeof opts.max === "number" &&
        valueNumber > opts.max
    ) {
        throw ValidationError.Incorrect(
            key,
            userKey,
            `less than or equal to ${opts.max}`,
            `menor o igual que ${opts.max}`
        );
    }

    return valueNumber;
}

/**
 * Validates if given value is a json string
 * @param {any} value - Value
 * @param {string} key - key
 * @param {string} userKey - User key
 * @param {object} opts - Options
 * @param {boolean} opts.optional - A flag indicating if value can be null or undefined
 * @returns {string}
 */
function validateStringJson(value, key, userKey, opts) {
    const jsonString = validateString(value, key, userKey, {
        optional: opts?.optional ?? false,
    });

    try {
        JSON.parse(jsonString);
    } catch (error) {
        throw ValidationError.Incorrect(
            key,
            userKey,
            "string parseable to json",
            "un texto en formato JSON"
        );
    }

    return jsonString;
}

/**
 * Validates if given value is part of the constants
 * @param {any} value - Value
 * @param {any[]} constants - constants
 * @param {string} key - key
 * @param {string} userKey - User key
 * @param {string} constantsName - Constants name
 * @param {string} constantsUserName - Constants user name
 * @param {object} opts - Options
 * @param {boolean} opts.optional - A flag indicating if value can be null or undefined
 * @returns {string}
 */
function validateConstant(
    value,
    constants,
    key,
    userKey,
    constantsName,
    constantsUserName,
    opts
) {
    if (isUndefinedOrNull(value)) {
        if (isUndefinedOrNull(opts)) {
            throw ValidationError.UndefinedOrNullValue(key, userKey);
        }

        if (opts.optional) {
            return value;
        }

        throw ValidationError.UndefinedOrNullValue(key, userKey);
    }

    if (!(constants instanceof Array)) {
        const message = "parameter: constants must be an array";
        throw new Error(message);
    }

    if (!constants.includes(value)) {
        throw ValidationError.Incorrect(
            key,
            userKey,
            constantsName,
            constantsUserName
        );
    }

    return value;
}

/**
 * Validates if given value is a constant
 * @param {any} value - Value
 * @param {any[]} constants - Constants
 * @param {string} key - key
 * @param {string} userKey - User key
 * @param {string} constantsName - Constants name
 * @param {string} constantsUserName - Constants user name
 * @param {object} opts - Options
 * @param {boolean} opts.optional - A flag indicating if value can be null or undefined
 * @returns {boolean}
 */
function validateCommaSeparatedConstant(
    value,
    constants,
    key,
    userKey,
    constantsName,
    constantsUserName,
    opts
) {
    const valueString = validateString(value, key, userKey, {
        optional: opts?.optional ?? false,
    });

    if (isUndefinedOrNull(valueString)) {
        if (isUndefinedOrNull(opts)) {
            throw ValidationError.UndefinedOrNullValue(key, userKey);
        }

        if (opts.optional) {
            return value;
        }

        throw ValidationError.UndefinedOrNullValue(key, userKey);
    }

    const values = valueString.split(",");
    for (let i = 0; i < values.length; i++) {
        const value = values[i];
        validateConstant(
            value,
            constants,
            `[${key}] at position ${i}`,
            `${userKey} en la posicion ${i + 1}`,
            constantsName,
            constantsUserName
        );
    }

    return valueString;
}

/**
 * Validates if given value is an array
 * @param {any} value - Value
 * @param {string} key - key
 * @param {string} userKey - User key
 * @param {object} opts - Options
 * @param {boolean} opts.optional - A flag indicating if value can be null or undefined
 * @param {boolean} opts.canBeEmpty - A flag indicating if value can be empty
 * @returns {any}
 */
function validateArray(value, key, userKey, opts) {
    if (isUndefinedOrNull(value)) {
        if (isUndefinedOrNull(opts)) {
            throw ValidationError.UndefinedOrNullValue(key, userKey);
        }

        if (opts.optional) {
            return value;
        }

        throw ValidationError.UndefinedOrNullValue(key, userKey);
    }

    if (!Array.isArray(value)) {
        throw ValidationError.Incorrect(
            key,
            userKey,
            "an array",
            "una colección"
        );
    }

    if (!isUndefinedOrNull(opts?.canBeEmpty)) {
        if (!opts.canBeEmpty && value.length === 0) {
            throw ValidationError.Incorrect(
                key,
                userKey,
                "an array with at least one element",
                "una colección con al menos un elemento"
            );
        }
    }

    return value;
}

/**
 * Validates if given value is a boolean string
 * @param {any} value - Value
 * @param {string} key - key
 * @param {string} userKey - User key
 * @param {object} opts - Options
 * @param {boolean} opts.optional - A flag indicating if value can be null or undefined
 * @returns {boolean}
 */
function validateStringBoolean(value, key, userKey, opts) {
    const boolString = validateString(value, key, userKey, {
        optional: opts?.optional ?? false,
    });

    if (isUndefinedOrNull(boolString)) {
        if (isUndefinedOrNull(opts)) {
            throw ValidationError.UndefinedOrNullValue(key, userKey);
        }

        if (opts.optional) {
            return value;
        }

        throw ValidationError.UndefinedOrNullValue(key, userKey);
    }

    if (boolString !== "true" && boolString !== "false") {
        throw new ValidationError(
            `${userKey} is not a boolean`,
            `${userKey} debe indicar verdadero o falso`
        );
    }

    return boolString === "true";
}

/**
 * Validates if given value is a boolean string
 * @param {any} value - Value
 * @param {string} key - key
 * @param {string} userKey - User key
 * @param {object} opts - Options
 * @param {boolean} opts.optional - A flag indicating if value can be null or undefined
 * @returns {boolean}
 */
function validateCommaSeparatedIntegers(value, key, userKey, opts) {
    const valueString = validateString(value, key, userKey, {
        optional: opts?.optional ?? false,
    });

    if (isUndefinedOrNull(valueString)) {
        if (isUndefinedOrNull(opts)) {
            throw ValidationError.UndefinedOrNullValue(key, userKey);
        }

        if (opts.optional) {
            return value;
        }

        throw ValidationError.UndefinedOrNullValue(key, userKey);
    }

    const values = valueString.split(",");
    for (let i = 0; i < values.length; i++) {
        const value = values[i];
        validateInteger(
            value,
            `[${key}] at position ${i}`,
            `${userKey} en la posicion ${i + 1}`,
            { min: 1 }
        );
    }

    return valueString;
}

/**
 * Validates if given value is a boolean string
 * @param {any} value - Value
 * @param {string} key - key
 * @param {string} userKey - User key
 * @param {object} opts - Options
 * @param {boolean} opts.optional - A flag indicating if value can be null or undefined
 * @returns {boolean}
 */
function validateBoolean(value, key, userKey, opts) {
    if (isUndefinedOrNull(value)) {
        if (isUndefinedOrNull(opts)) {
            throw ValidationError.UndefinedOrNullValue(key, userKey);
        }

        if (opts.optional) {
            return value;
        }

        throw ValidationError.UndefinedOrNullValue(key, userKey);
    }

    if (typeof value !== "boolean") {
        throw new ValidationError.Incorrect(
            `${key} should be a boolean`,
            `${userKey} debe ser true or false`
        );
    }

    return value;
}

/**
 * Validates if given value is a date string
 * @param {any} value - Value
 * @param {string} key - key
 * @param {string} userKey - User key
 * @param {object} opts - Options
 * @param {boolean} opts.optional - A flag indicating if value can be null or undefined
 * @returns {string}
 */
function validateDateString(value, key, userKey, opts) {
    if (isUndefinedOrNull(value)) {
        if (isUndefinedOrNull(opts)) {
            throw ValidationError.UndefinedOrNullValue(key, userKey);
        }

        if (opts.optional) {
            return value;
        }

        throw ValidationError.UndefinedOrNullValue(key, userKey);
    }

    if (typeof value !== "string") {
        throw ValidationError.Incorrect(
            `${key} should be a string`,
            `${userKey} debe ser una fecha válida`
        );
    }

    const date = new Date(value);
    if (isNaN(date.getTime())) {
        throw ValidationError.Incorrect(
            `${key} should be a date`,
            `${userKey} debe ser una fecha válida`
        );
    }

    return value;
}

/**
 * Validates if given value is a iso date string
 * @param {any} value - Value
 * @param {string} key - key
 * @param {string} userKey - User key
 * @param {object} opts - Options
 * @param {boolean} opts.optional - A flag indicating if value can be null or undefined
 * @returns {string}
 */
function validateISODateString(value, key, userKey, opts) {
    if (isUndefinedOrNull(value)) {
        if (isUndefinedOrNull(opts)) {
            throw ValidationError.UndefinedOrNullValue(key, userKey);
        }

        if (opts.optional) {
            return value;
        }

        throw ValidationError.UndefinedOrNullValue(key, userKey);
    }

    if (typeof value !== "string") {
        throw ValidationError.Incorrect(
            `${key} should be a string`,
            `${userKey} debe ser una fecha válida`
        );
    }

    const date = DateTime.fromISO(value);

    if (!date.isValid) {
        throw ValidationError.Incorrect(
            `${key} should be a date in ISO format`,
            `${userKey} debe ser una fecha válida`
        );
    }

    return value;
}

/**
 * Validates if given value is a decimal
 * @param {any} value - Value
 * @param {string} key - key
 * @param {string} userKey - User key
 * @param {object} opts - Options
 * @param {boolean} opts.optional - A flag indicating if value can be null or undefined
 * @returns {string}
 */
function validateDecimal(value, key, userKey, opts) {
    if (isUndefinedOrNull(value)) {
        if (isUndefinedOrNull(opts)) {
            throw ValidationError.UndefinedOrNullValue(key, userKey);
        }

        if (opts.optional) {
            return value;
        }

        throw ValidationError.UndefinedOrNullValue(key, userKey);
    }

    if (typeof value !== "string") {
        throw new ValidationError.Incorrect(
            `${key} should be a string decimal`,
            `${userKey} debe ser una número decimal`
        );
    }

    const regexDecimal = /^-?[0-9]{1,}(.[0-9]{1,2})?$/gm;
    if (!regexDecimal.test(value)) {
        throw new ValidationError.Incorrect(
            `${key} should be a decimal.`,
            `${userKey} debe ser un número decimal.`
        );
    }

    return value;
}

module.exports = {
    isNull,
    isUndefined,
    isUndefinedOrNull,
    isEmptyOrBlankSpace,
    isPhoneForSMS,
    isEmail,
    isHTTPURL,
    validateInteger,
    validateString,
    validateStringJson,
    validateStringBoolean,
    validateConstant,
    validateArray,
    validateCommaSeparatedIntegers,
    validateBoolean,
    validateDateString,
    validateCommaSeparatedConstant,
    validateDecimal,
    validateISODateString,
};
