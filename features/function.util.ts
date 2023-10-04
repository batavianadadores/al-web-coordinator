/// Deep copy of own poexisting elements inside an object
/**
 * Copy the values of source object properties that exists in target object own properties
 * @param target - The target object to copy to
 * @param source - The source object to copy from
 * @param levels - The number of levels to copy
 */
export function assignDeep<T extends {}, U extends {}>(
    target: T,
    source: U,
    levels: number = 10
) {
    const t = Object(target);
    const s = Object(source);
    Object.getOwnPropertyNames(s).forEach((key) => {
        if (typeof s[key] === "object" && levels > 0) {
            if (s[key] === undefined) {
                t[key] = undefined;
            } else if (s[key] === null) {
                t[key] = null;
            } else {
                t[key] = assignDeep(
                    t[key],
                    s[key],
                    levels - 1
                );
            }
        } else {
            t[key] = s[key];
        }
    });
    return t;
}
