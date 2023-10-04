class ValidationError extends Error {
    /**
     * Initialize a validation error
     * @param {string} message - Message
     * @param {string} userMessage - User message
     */
    constructor(message, userMessage) {
        super(message);

        this.name = "ValidationError";
        this.userMessage = userMessage;
    }

    static UndefinedOrNullValue(key, userKey) {
        const message = `The parameter: ${key} must contain a value`;
        const userMessage = `Indica un valor para ${userKey}`;
        return new ValidationError(message, userMessage);
    }

    static Incorrect(key, userKey, message, userMessage) {
        const _message = `The parameter: ${key} should be ${message}`;
        const _userMessage = `${userKey} debe ser ${userMessage}`;
        return new ValidationError(_message, _userMessage);
    }

    static NoValuesToUpdate() {
        const _message = `Should indicate a value to update`;
        const _userMessage = `Añade valores para actualizar`;
        return new ValidationError(_message, _userMessage);
    }
}

module.exports = { ValidationError };
