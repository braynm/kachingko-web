
/**
 * Formats a number into human-readable format (e.g., 40k, 1.2M, 500B)
 * Basic FP approach - no for loops
 * @param {number} amount - The number to format
 * @returns {string} Formatted string
 */
export function formatToHumanReadableAmount(amount: number) {
  // Handle edge cases
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '0';
  }

  const num = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';

  // Define the suffixes and their corresponding values
  const suffixes = [
    { value: 1e12, suffix: 'T' }, // Trillion
    { value: 1e9, suffix: 'B' },  // Billion
    { value: 1e6, suffix: 'M' },  // Million
    { value: 1e3, suffix: 'K' },  // Thousand
  ];

  // Find the appropriate suffix using functional approach
  const suffix = suffixes.find(({ value }) => num >= value);

  if (suffix) {
    const formatted = num / suffix.value;
    const rounded = Number(formatted.toFixed(1));

    // Remove unnecessary decimal places
    const displayNumber = rounded % 1 === 0 ? rounded.toString() : rounded.toFixed(1);

    return `${sign}${displayNumber}${suffix.suffix}`;
  }

  // For numbers less than 1000, return as is
  const displayNumber = num % 1 === 0 ? num.toString() : num.toFixed(1);
  return `${sign}${displayNumber}`;
}

export function formatAmount(amount: number | string, precision: number = 2): string {
  // Convert to number if string
  const value = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(value)) {
    throw new Error('Invalid amount: ' + amount);
  }

  // Determine if negative
  const isNegative = value < 0;
  const absoluteValue = Math.abs(value);

  // Round to specified precision
  const multiplier = Math.pow(10, precision);
  const rounded = Math.round(absoluteValue * multiplier) / multiplier;

  // Format with precision and add comma separators
  const formattedNumber = rounded.toFixed(precision).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Return with PHP symbol and negative sign if needed
  return isNegative ? `-PHP ${formattedNumber}` : `PHP ${formattedNumber}`;
}
