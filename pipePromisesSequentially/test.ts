import { pipePromisesSequentially } from "./index.ts";
import { assertEquals } from "https://deno.land/std@0.180.0/testing/asserts.ts";

// TODO: git gud at promises

Deno.test({ name: "pipePromisesSequentially" }, () => {});

Deno.test("should return the result of the last promise", async () => {
  // const p1 = (data: number) => Promise.resolve(data);
  // const p2 = (data: number) => Promise.resolve(data + 1);
  // const p3 = (data: number) => Promise.resolve(data * 2);
  // const result = await pipePromisesSequentially(p1, p2, p3)(1);
  // assertEquals(result, 3);
});
