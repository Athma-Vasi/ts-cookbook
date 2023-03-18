import { safePipe } from "./index.ts";
import { assertEquals } from "https://deno.land/std@0.180.0/testing/asserts.ts";

Deno.test("safePipe", () => {});
Deno.test("╰┈─➤ should not error", () => {
  const inc1 = (a: number) => a + 1;
  const double = (a: number) => a * 2;
  const square = (a: number) => a * a;
  const root = Math.sqrt;
  const halve = (a: number) => a / 2;
  const dec1 = (a: number) => a - 1;

  const result = safePipe(inc1, double, square, root, halve, dec1)(2);

  assertEquals(result, { data: 2, error: null });
});

Deno.test("╰┈─➤ should error", () => {
  const err = new Error("error when squaring");
  const inc1 = (a: number) => a + 1;
  const double = (a: number) => a * 2;
  const square = (_a: number) => {
    throw err; // instead of doing the job, we throw an error
  };
  const root = Math.sqrt;
  const halve = (a: number) => a / 2;
  const dec1 = (a: number) => a - 1;

  const result = safePipe(inc1, double, square, root, halve, dec1)(1);

  assertEquals(result, { data: 4, error: err });
});
