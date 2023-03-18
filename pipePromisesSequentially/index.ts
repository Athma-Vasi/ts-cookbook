import { SafeObject } from "../safePipe/index.ts";

const runAsyncHelper = async <T>(
  fn: (data: T) => T,
  value: SafeObject<T>
): Promise<
  | {
      data: Awaited<T>;
      error: null;
    }
  | {
      data: null;
      error: any;
    }
> => {
  if (value.error) return { data: null, error: value.error };

  try {
    if (value.data) {
      return { data: await fn(value.data), error: null };
    }
  } catch (error) {
    return { data: null, error };
  }

  return { data: null, error: null };
};

function pipePromisesSequentially<T>(...fns: Array<(data: T) => T>) {
  return async function (value: T) {
    const initialValue: SafeObject<T> = { data: value, error: null };

    return fns.reduce(async (acc, fn: (data: T) => T) => {
      return await runAsyncHelper(fn, await acc);
    }, structuredClone(initialValue));
  };
}

export { pipePromisesSequentially };
