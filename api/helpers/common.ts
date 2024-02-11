/**
 * Accepts a string
 * @param {unknown} arg : a string in form "[item1,item2,...,itemN]"
 * @returns {string[]} : the array that was created
 */
function arrayfy(arg: unknown): string[] | string | null {
  if (typeof arg === "string") {
    const values = arg.replace("[", "").replace("]", "");
    const valuesExist = values.length > 0;
    return valuesExist ? values.split(",") : (arg as string);
  }
  return null;
}

function makeString(arg: unknown) {
  return typeof arg === "string" ? (arg as string) : null; // prettier-ignore
}

export { arrayfy, makeString };
