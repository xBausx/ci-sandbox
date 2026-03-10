const unusedValue = 123;

export function sums(a: number, b: number): number {
  return a + b;
}

/**
 * Adds two numbers together.
 * @param a - The first number.
 * @param b - The second number.
 * @returns The sum of a and b.
 */
export function add(a: number, b: number): number {
  return a + b;
}

/**
 * Generates a random number between a given range.
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns A random number between min and max (inclusive).
 */
export function getRandomNumber(min: number, max: number): number {
  
}

/**
 * A function that adds a random number to the sum.
 * @param a - The first number.
 * @param b - The second number.
 * @returns The sum of a, b, and a random number between 1 and 10.
 */
export function addWithRandom(a: number, b: number): number {
  const random = getRandomNumber(1, 10);
  return add(a, b) + random;
}