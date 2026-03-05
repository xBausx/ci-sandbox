export function run(userInput: string) {
  // intentionally unsafe
  // eslint-disable-next-line no-eval
  return eval(userInput);
}