/**
 * Templates
 * @template T
 * @param {any} object - Object from copy properties
 * @param {T} constructor - Constructor
 * @returns {InstanceType<T>}
 */
function modelFromObject(object, constructor) {
    const model = new constructor();
    const values = {};
    const modelProperties = Object.keys(model);

    for (const key in object) {
        if (
            Object.hasOwnProperty.call(object, key) &&
            modelProperties.includes(key)
        ) {
            const value = object[key];
            values[key] = value;

            if (value instanceof Date) {
                values[key] = value.toISOString();
            }
        }
    }
    return Object.assign(model, values);
}

module.exports = { modelFromObject };
