import { SafeObject } from "../safePipe/index.ts";

/**
 * tryCatch is a function that takes an expression and returns an object with the result of the expression and the error if any, safely. This prevents the error from being thrown.
 *
 * @function
 * @param {Function} expression - The expression to be executed.
 * @returns {SafeObject} - of the form { data: T | null, error: Error | null }
 */
function tryCatch<T>(expression: () => T): SafeObject<T> {
  try {
    return { data: expression(), error: null };
  } catch (error) {
    return { data: null, error: error };
  }
}

export { tryCatch };
