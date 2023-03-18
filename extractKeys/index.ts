/**
 * Extracts the keys from an array of objects
 * @function
 * @param {string} key - The key to extract from the object
 * @returns {function} - A function that takes an object
 * @returns {T | undefined} - The value of the key or undefined if the key does not exist
 */
function getKeyValues<T>(key: string) {
  return function (object: Record<string, T>) {
    if (!object) return undefined;
    if (Object.hasOwn(object, key)) return object[key];
    return undefined;
  };
}

/**
 * Extracts the keys from an array of objects. If no keys or  no objects are passed, an empty array is returned.
 *
 * @function
 * @param {string[]} keys - The keys to extract from the object
 * @returns {function} - A function that takes an array of objects
 * @returns {Record<string, T>[]} - An array of objects with the keys extracted
 *
 * @example
 * const objs = [
 *  { id: 1, number: 31, place: { city: "Sarnath" }, color: "red" },
 * { id: 2, number: 43, place: { city: "Kandy" }, color: "black" },
 * { id: 3, number: 19, place: { city: "Lhasa" }, color: "yellow" },
 * ];
 * const keys = ["id", "place"]; *
 * const result = extractKeys(keys)(objs);
 * console.log(result);
 * // [
 * //   { id: 1, place: { city: "Sarnath" } },
 * //   { id: 2, place: { city: "Kandy" } },
 * //   { id: 3, place: { city: "Lhasa" } },
 * // ]
 *
 */
function extractKeys<T>(keys: string[] = []) {
  return function (objects: Record<string, T>[] = []) {
    return objects.reduce(
      (result: Record<string, T>[], object: Record<string, T>) => {
        if (!object) return result;
        if (keys.length === 0) return result;

        const newObj = keys.reduce((obj, key) => {
          const value = getKeyValues(key)(object);
          Object.defineProperty(obj, key, {
            value,
            writable: true,
            enumerable: true,
            configurable: true,
          });

          return obj;
        }, {});

        result.push(newObj);

        return result;
      },
      []
    );
  };
}

export { extractKeys, getKeyValues };
