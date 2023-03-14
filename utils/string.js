export const toFixedString = (number, precision = 2) => {
  const [integer, decimal] = number.split(".");
  const decimalFixed = decimal?.slice(0, precision) || "";
  const decimalFixedPadded = decimalFixed.padEnd(precision, "0");
  return `${integer}.${decimalFixedPadded}`;
};
