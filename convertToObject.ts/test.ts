import { convertToObject } from "./index.ts";
import { assertEquals } from "https://deno.land/std@0.180.0/testing/asserts.ts";

Deno.test({ name: "convertToObject" }, () => {});
Deno.test('should return an empty object if "key" is not provided', () => {
  const result = convertToObject("")([]);

  assertEquals(result, {});
});

Deno.test(
  'should return an empty object if "sourceObject" is not provided',
  () => {
    const result = convertToObject("id")(undefined);

    assertEquals(result, {});
  }
);

Deno.test(
  'should return an empty object if "sourceObject" is an empty array',
  () => {
    const result = convertToObject("id")([]);

    assertEquals(result, {});
  }
);

Deno.test(
  'should return an empty object if "key" is not found in the sourceObject',
  () => {
    const sourceObject = [
      { name: "jojo", age: 28, city: "tokyo" },
      { name: "brando", age: 25, city: "kolkata" },
      { name: "suzi", age: 25, city: "luxor" },
    ];

    const result = convertToObject("id")(sourceObject);

    assertEquals(result, {});
  }
);

Deno.test("should return an object with the key and value", () => {
  const sourceObject = [
    { id: 1, name: "jojo", age: 28, city: "tokyo" },
    { id: 2, name: "brando", age: 25, city: "kolkata" },
    { id: 3, name: "suzi", age: 25, city: "luxor" },
  ];

  const result = convertToObject("id")(sourceObject);

  assertEquals(result, {
    1: { id: 1, name: "jojo", age: 28, city: "tokyo" },
    2: { id: 2, name: "brando", age: 25, city: "kolkata" },
    3: { id: 3, name: "suzi", age: 25, city: "luxor" },
  });
});

Deno.test(
  "should return an object with the key and value when the key is not unique",
  () => {
    const sourceObject = [
      { id: 1, name: "jojo", age: 28, city: "tokyo" },
      { id: 2, name: "brando", age: 25, city: "kolkata" },
      { id: 3, name: "suzi", age: 25, city: "luxor" },
      { id: 1, name: "jojo", age: 28, city: "tokyo" },
      { id: 2, name: "brando", age: 25, city: "kolkata" },
      { id: 3, name: "suzi", age: 25, city: "luxor" },
    ];

    const result = convertToObject("id")(sourceObject);

    assertEquals(result, {
      1: { id: 1, name: "jojo", age: 28, city: "tokyo" },
      2: { id: 2, name: "brando", age: 25, city: "kolkata" },
      3: { id: 3, name: "suzi", age: 25, city: "luxor" },
    });
  }
);
