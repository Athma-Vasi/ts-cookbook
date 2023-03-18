import { tryCatch } from "./index.ts";
import { assertEquals } from "https://deno.land/std@0.180.0/testing/asserts.ts";

Deno.test({ name: "tryCatch" }, () => {});

Deno.test("╰┈─➤ should not error", () => {
  const result = tryCatch(() => 1 + 1);

  assertEquals(result, { data: 2, error: null });
});

Deno.test("╰┈─➤ should error", () => {
  const err = new Error("error when adding");
  const result = tryCatch(() => {
    throw err;
  });

  assertEquals(result, { data: null, error: err });
});

Deno.test("╰┈─➤ should error", () => {
  const testFn = (num: number) => {
    if (num > 5) {
      throw new Error("oops");
    }
    return num;
  };

  const result = tryCatch(() => testFn(6));

  assertEquals(result, { data: null, error: new Error("oops") });
});

Deno.test("╰┈─➤ should not error", () => {
  const testFn = (num: number) => {
    if (num > 5) {
      throw new Error("oops");
    }
    return num;
  };

  const result = tryCatch(() => testFn(4));

  assertEquals(result, { data: 4, error: null });
});
