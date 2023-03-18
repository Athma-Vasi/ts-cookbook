import { enrichObject } from "./index.ts";
import { assertEquals } from "https://deno.land/std@0.180.0/testing/asserts.ts";

Deno.test("enrichObject", () => {});

Deno.test(
  '╰┈─➤ should return the input object if "match" is not provided',
  () => {
    const inputObject = {
      customerId: 1,
      kyc: true,
      createdOn: "2022-11-01",
    };
    const result = enrichObject({
      match: undefined,
      extract: ["name", "age", "city"],
      source: [
        { id: 1, name: "jojo", age: 28, city: "tokyo" },
        { id: 2, name: "brando", age: 25, city: "kolkata" },
        { id: 3, name: "suzi", age: 25, city: "luxor" },
      ],
    })(inputObject);

    assertEquals(result, inputObject);
  }
);

Deno.test(
  '╰┈─➤ should return the input object if "extract" is not provided',
  () => {
    const inputObject = {
      customerId: 1,
      kyc: true,
      createdOn: "2022-11-01",
    };
    const result = enrichObject({
      match: { sourceKey: "id", targetKey: "customerId" },
      extract: [],
      source: [
        { id: 1, name: "jojo", age: 28, city: "tokyo" },
        { id: 2, name: "brando", age: 25, city: "kolkata" },
        { id: 3, name: "suzi", age: 25, city: "luxor" },
      ],
    })(inputObject);

    assertEquals(result, inputObject);
  }
);

Deno.test(
  '╰┈─➤ should return the input object if "source" is not provided',
  () => {
    const inputObject = {
      customerId: 1,
      kyc: true,
      createdOn: "2022-11-01",
    };
    const result = enrichObject({
      match: { sourceKey: "id", targetKey: "customerId" },
      extract: ["name", "age", "city"],
      source: [],
    })(inputObject);

    assertEquals(result, inputObject);
  }
);

Deno.test(
  '╰┈─➤ should return the input object if "source" is an empty array',
  () => {
    const inputObject = {
      customerId: 1,
      kyc: true,
      createdOn: "2022-11-01",
    };
    const result = enrichObject({
      match: { sourceKey: "id", targetKey: "customerId" },
      extract: ["name", "age", "city"],
      source: [],
    })(inputObject);

    assertEquals(result, inputObject);
  }
);

Deno.test("╰┈─➤ should return correct result", () => {
  const inputObject = {
    customerId: 1,
    kyc: true,
    createdOn: "2022-11-01",
  };
  const result = enrichObject({
    match: { sourceKey: "id", targetKey: "customerId" },
    extract: ["name", "age", "city"],
    source: [
      { id: 1, name: "jojo", age: 28, city: "tokyo" },
      { id: 2, name: "brando", age: 25, city: "kolkata" },
      { id: 3, name: "suzi", age: 25, city: "luxor" },
    ],
  })(inputObject);

  assertEquals(result, {
    customerId: 1,
    kyc: true,
    createdOn: "2022-11-01",
    name: "jojo",
    age: 28,
    city: "tokyo",
  });
});
