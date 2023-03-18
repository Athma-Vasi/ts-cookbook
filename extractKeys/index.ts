function getKeyValues<T>(key: string) {
  return function (object: Record<string, T>) {
    if (!object) return undefined;
    if (Object.hasOwn(object, key)) return object[key];
    return undefined;
  };
}

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
