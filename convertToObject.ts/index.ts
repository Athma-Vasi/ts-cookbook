/**
 *  Convert an array of objects to an object of objects. The key of the object is the value of the key provided.
 * If the key is not unique, the last value will be used.
 * Use this function immediately after fetching from an API and then lookup becomes O(1) instead of O(n).
 * @param key The key to use as the key of the object
 * @param sourceObject The array of objects to convert
 * @returns An object of objects
 */
function convertToObject<T>(key: string) {
  return function (sourceObject: Record<string, T>[] = []) {
    if (!sourceObject || !key) return {};
    if (sourceObject.length === 0) return {};

    const keyVals = sourceObject.reduce(
      (acc: T[], record: Record<string, T>) => {
        if (Object.hasOwn(record, key)) acc.push(record[key]);

        return acc;
      },
      []
    );

    if (keyVals.length === 0) return {};

    return Object.fromEntries(
      keyVals.map((kval) => [
        kval,
        sourceObject.find((item) => item[key] === kval),
      ])
    );
  };
}

export { convertToObject };
