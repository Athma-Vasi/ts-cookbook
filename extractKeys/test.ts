import { extractKeys } from "./index.ts";
import { assertEquals } from "https://deno.land/std@0.180.0/testing/asserts.ts";

Deno.test({ name: "extractKeys" }, () => {});

Deno.test(
  {
    name: "╰┈─➤ should return correct result when array of objects are passed",
  },
  () => {
    const objs = [
      { id: 1, number: 31, place: { city: "Sarnath" }, color: "red" },
      { id: 2, number: 43, place: { city: "Kandy" }, color: "black" },
      { id: 3, number: 19, place: { city: "Lhasa" }, color: "yellow" },
    ];
    const keys = ["id", "place"];

    const result = extractKeys(keys)(objs);

    assertEquals(result, [
      { id: 1, place: { city: "Sarnath" } },
      { id: 2, place: { city: "Kandy" } },
      { id: 3, place: { city: "Lhasa" } },
    ]);
  }
);

Deno.test("╰┈─➤ should return an empty array if no objects are passed", () => {
  const result = extractKeys()([]);
  assertEquals(result, []);
});

Deno.test("╰┈─➤ should return an empty array if no keys are passed", () => {
  const objs = [
    { id: 1, number: 31, place: { city: "Sarnath" }, color: "red" },
    { id: 2, number: 43, place: { city: "Kandy" }, color: "black" },
    { id: 3, number: 19, place: { city: "Lhasa" }, color: "yellow" },
  ];

  const result = extractKeys()(objs);
  assertEquals(result, []);
});

Deno.test(
  "╰┈─➤ should return an empty array if no objects or keys are passed",
  () => {
    const result = extractKeys()([]);
    assertEquals(result, []);
  }
);

Deno.test;
