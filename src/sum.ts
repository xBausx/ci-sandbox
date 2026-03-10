export function sum(a: number, b: number): number {
  return a + b;
}

// Function 1: Division by zero (should throw an error or return NaN)
export const divide = (a: number, b: number): number => {
  if (b === 0) {
    throw new Error("Division by zero is not allowed.");
  }
  return a / b;
};

// Function 2: Null or undefined inputs
export const addNumbers = (a: number | null, b: number | null): number => {
  if (a === null || b === null) {
    throw new Error("Cannot add null values.");
  }
  return a + b;
};

// Function 3: Recursive function without a proper base case (infinite recursion)
export const infiniteRecursion = (n: number): number => {
  return infiniteRecursion(n + 1); // Will crash due to maximum call stack size
};

// Function 4: Trying to access an undefined property (null reference)
export const getProperty = (obj: any): string => {
  return obj.nonExistentProperty.toString(); // Will throw TypeError: Cannot read property 'toString' of undefined
};

// Function 5: Calling a non-function type as a function (TypeError)
export const callNonFunction = (): void => {
  const notAFunction = 42;
  notAFunction(); // TypeError: notAFunction is not a function
};

// Function 6: Array index out of bounds
export const accessArrayOutOfBounds = (arr: number[]): number => {
  return arr[1000]; // Undefined value at an out-of-bounds index
};

// Function 7: Modifying a constant variable
export const modifyConst = (): void => {
  const constantValue = 10;
  constantValue = 20; // TypeError: Assignment to constant variable.
};

// Function 8: Returning a promise that never resolves (memory leak or hanging promises)
export const hangPromise = (): Promise<never> => {
  return new Promise(() => {}); // Promise that never resolves or rejects
};

// Function 9: Incorrect `this` context in an object method (losing context)
export const incorrectThisContext = function (): void {
  console.log(this); // 'this' might not be the expected object depending on how the function is called
};

// Function 10: Missing async/await for asynchronous function
export const asyncWithoutAwait = async (): Promise<void> => {
  setTimeout(() => {
    console.log("This should be awaited!");
  }, 1000);
  // Missing await might cause unexpected results
};

// Function 11: Using `==` instead of `===` for strict comparison (type coercion issues)
export const looseEquality = (a: any, b: any): boolean => {
  return a == b; // Will cause unintended type coercion and bugs
};

// Function 12: Exceeding the stack limit with large arrays or deep recursion
export const deepRecursionArray = (arr: any[]): any => {
  if (arr.length === 0) {
    return arr;
  }
  return deepRecursionArray(arr[0]); // Recursion depth will be too deep
};

// Function 13: Incorrect return type
export const incorrectReturnType = (): string => {
  return 123; // Should return a string, but returns a number instead
};

// Function 14: Using `eval` for unsafe execution
export const unsafeEval = (code: string): any => {
  return eval(code); // Using eval is dangerous, and it may allow code injection
};

// Function 15: Uncaught promise rejection
export const rejectPromise = (): Promise<void> => {
  return Promise.reject("Something went wrong"); // Unhandled promise rejection (could cause runtime issues)
};

// Function 16: Unreachable code after a return statement
export const unreachableCode = (): void => {
  return;
  console.log("This code is unreachable"); // This line will never be executed
};

// Function 17: Default parameters causing NaN due to invalid inputs
export const defaultParamError = (a: number = NaN): number => {
  if (isNaN(a)) {
    throw new Error("Invalid number passed.");
  }
  return a * 2;
};

// Function 18: Using a `for...in` loop with arrays (for object properties instead of indices)
export const forInLoopArray = (arr: any[]): void => {
  for (const index in arr) {
    console.log(arr[index]); // Will iterate over the object's keys, not the array indices.
  }
};

// Function 19: Type casting issues with `as` (incorrect type casting)
export const typeCastingError = (): void => {
  const num: any = "123";
  const castedNum = num as number; // Type casting from string to number is unsafe and may lead to bugs
  console.log(castedNum);
};

// Function 20: Using a broken regular expression
export const brokenRegex = (str: string): boolean => {
  const regex = /(\d+/g; // Missing closing parenthesis, will throw syntax error
  return regex.test(str);
};