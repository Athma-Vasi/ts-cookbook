type SafeObject<T> = {
  data: T | null;
  error: unknown;
};

type SafeWrapper = <T>(
  func: (data: T) => T,
  value: SafeObject<T>
) => SafeObject<T>;

/**
 *  The safeWrapper() function takes a function and a SafeObject and returns a SafeObject.
 * If the SafeObject contains an error, the error is returned as part of the SafeObject.
 * If the SafeObject does not contain an error, the function is executed and the result is returned as part of the SafeObject.
 *
 * @function
 * @param {function} func - The function to be wrapped.
 * @param {SafeObject} value - The SafeObject to be passed to the wrapped function.
 * @returns {SafeObject} - A new SafeObject that contains the output of the wrapped function, along with any caught errors.
 * If error, return value is { data: T, error: Error }
 * If no error, return value is { data: T, error: null }
 */
const safeWrapper: SafeWrapper = (func, value) => {
  if (value.error) {
    return value;
  }

  try {
    if (value.data === null) throw new Error("data is null");
    return { data: func(value.data), error: null };
  } catch (error) {
    return { data: value.data, error: error };
  }
};

/**
 *  The safePipe() function is a higher-order function that takes an arbitrary number of functions as arguments.
 * The returned function takes a value and wraps it in a SafeObject and passes it to the first function.
 * The result of the first function is passed to the second function, and so on.
 * If any of the functions throws an error, the error is caught and returned as part of the SafeObject.
 * If no error is thrown, the final result is returned as part of the SafeObject.
 * @function
 * @param {function} fns - The functions to be piped
 * @returns {SafeObject} - The result of the piped functions of the form { data: T, error: Error | null }
 * @example
 * const addOne = (x: number) => x + 1;
 * const multiplyByTwo = (x: number) => x * 2;
 * const divideByTwo = (x: number) => x / 2;
 * const safePipe = safePipe(addOne, multiplyByTwo, divideByTwo);
 * const result = safePipe(1);
 * // result = { data: 2, error: null }
 * @example
 * const addOne = (x: number) => x + 1;
 * const multiplyByTwo = (x: number) => x * 2;
 * const divideByTwo = (x: number) => x / 2;
 * const throwAnError = (x: number) => {
 *  throw new Error("error when dividing by two");
 * };
 * const safePipe = safePipe(addOne, multiplyByTwo, throwAnError, divideByTwo);
 * const result = safePipe(1);
 * // result = { data: 4, error: Error("error when dividing by two") }
 */
const safePipe =
  <T>(...fns: Array<(data: T) => T>) =>
  (value: T): SafeObject<T> => {
    const initialValue: SafeObject<T> = { data: value, error: null };

    return fns.reduce(
      (acc: SafeObject<T>, fn: (data: T) => T) => safeWrapper(fn, acc),
      structuredClone(initialValue)
    );
  };

export { safePipe, safeWrapper, type SafeObject, type SafeWrapper };
