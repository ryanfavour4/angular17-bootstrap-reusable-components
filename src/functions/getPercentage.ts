/**
 * Calculate the percentage of a value relative to a total.
 * @param {number} value - The value for which you want to find the percentage.
 * @param {number} total - The total value against which the percentage is calculated.
 * @returns {number} - The calculated percentage.
 */
function calculatePercentage(value: number, total: number) {
  if (total === 0) {
    // Avoid division by zero
    return 0;
  }

  return (value / total) * 100;
}

// Example usage:
const value = 25;
const total = 50;
const percentage = calculatePercentage(value, total);
console.log(`The percentage is: ${percentage}%`);
