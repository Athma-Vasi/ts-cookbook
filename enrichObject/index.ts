type EnrichObjectProps = {
  match: {
    sourceKey: string;
    targetKey: string;
  };
  extract: string[];
  source: Record<string, unknown>[];
};

type InputObject = Record<string, unknown>;

/**
 * The enrichObject() function is a higher-order function that takes an object with three properties: match, extract, and source.
 * The returned function takes an inputObject and enriches it with the appropriate data from the source array.
 * The function can be used to enrich an object with data from an array of objects. It will try to match the value of the sourceKey in the source array with the value of the targetKey in the input object. If a match is found, the function will try to extract the values of the keys mentioned in the extract property from the source object and add them to the input object.
 * @function
 * @param {Object} props - The properties object.
 * @param {Object} props.match - This property is an object with 2 properties: sourceKey and targetKey . The sourceKey is the key of the object in the source array and the targetKey is the key of the object in the input object.
 * @param {string[]} props.extract - This property is an array of strings that represent the keys of the object in the source array that we want to extract and add to the input object. This property can be an empty array.
 * @param {Object[]} props.source - This property is an array of objects that we want to extract data from. This property can be an empty array.
 * @returns {Object} - inputObject that is enriched with the appropriate data from the source array.
 * @example
 * const customers = [
 *  { id: 1, name: "john", age: 28, city: "denver" },
 * { id: 2, name: "bob", age: 25, city: "kyoto" },
 * { id: 3, name: "angela", age: 44, city: "mumbai" },
 * ];
 * const kycCustomer = {
 * customerId: 1,
 * kyc: true,
 * createdOn: "2022-11-01",
 * };
 * const result = enrichObject({
 * match: { sourceKey: "id", targetKey: "customerId" },
 * extract: ["name", "age", "city"],
 * source: customers,
 * })(kycCustomer);
 * // result = {
 * // customerId: 1,
 * // kyc: true,
 * // createdOn: "2022-11-01",
 * // name: "john",
 * // age: 28,
 * // city: "denver",
 * // }
 *
 */

function enrichObject({
  match,
  extract = [],
  source = [],
}: {
  match: { sourceKey: string; targetKey: string } | undefined;
  extract: string[];
  source: { [key: string | number | symbol]: unknown }[];
}) {
  return function (inputObject: InputObject): InputObject {
    if (!match) return inputObject;
    if (extract.length === 0) return inputObject;
    if (!source) return inputObject;
    if (source.length === 0) return inputObject;

    const matchingItem = source.find(
      (item) => item[match.sourceKey] === inputObject[match.targetKey]
    );
    if (!matchingItem) return inputObject;

    return extract.reduce((acc, key) => {
      if (matchingItem) [acc[key]] = [matchingItem[key]];

      return acc;
    }, structuredClone(inputObject));
  };
}

export { enrichObject };
