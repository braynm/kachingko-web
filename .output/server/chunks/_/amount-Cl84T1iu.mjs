function formatToHumanReadableAmount(amount) {
  if (amount === null || amount === void 0 || isNaN(amount)) {
    return "0";
  }
  const num = Math.abs(amount);
  const sign = amount < 0 ? "-" : "";
  const suffixes = [
    { value: 1e12, suffix: "T" },
    // Trillion
    { value: 1e9, suffix: "B" },
    // Billion
    { value: 1e6, suffix: "M" },
    // Million
    { value: 1e3, suffix: "K" }
    // Thousand
  ];
  const suffix = suffixes.find(({ value }) => num >= value);
  if (suffix) {
    const formatted = num / suffix.value;
    const rounded = Number(formatted.toFixed(1));
    const displayNumber2 = rounded % 1 === 0 ? rounded.toString() : rounded.toFixed(1);
    return `${sign}${displayNumber2}${suffix.suffix}`;
  }
  const displayNumber = num % 1 === 0 ? num.toString() : num.toFixed(1);
  return `${sign}${displayNumber}`;
}
function formatAmount(amount, precision = 2) {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(value)) {
    throw new Error("Invalid amount: " + amount);
  }
  const isNegative = value < 0;
  const absoluteValue = Math.abs(value);
  const multiplier = Math.pow(10, precision);
  const rounded = Math.round(absoluteValue * multiplier) / multiplier;
  const formattedNumber = rounded.toFixed(precision).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return isNegative ? `-PHP ${formattedNumber}` : `PHP ${formattedNumber}`;
}

export { formatAmount as a, formatToHumanReadableAmount as f };
//# sourceMappingURL=amount-Cl84T1iu.mjs.map
