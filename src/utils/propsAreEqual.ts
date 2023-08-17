export const propsAreEqual = <T extends Record<string, any> | undefined>(
  a: T,
  b: T
) => {
  if (typeof a === "undefined" && typeof b === "undefined") {
    return true;
  }

  if (
    (typeof a === "undefined" && typeof b !== "undefined") ||
    (typeof a !== "undefined" && typeof b === "undefined") ||
    Object.keys(a!).length !== Object.keys(b!).length
  ) {
    return false;
  }

  for (const [propA, valueA] of Object.entries(a!)) {
    if (b![propA] !== valueA) {
      return false;
    }
  }

  return true;
};
