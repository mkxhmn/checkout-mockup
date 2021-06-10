/**
 * calculate price drop based on rules
 * @param {Number} amount
 * @param {Number} count
 * @param {Number} to
 * @param {Number} specialPrice
 * @param {Number} normalPrice
 * @returns {Number}
 */
export function priceDropCalculator({
  amount = 0,
  count = 0,
  to = 0,
  specialPrice = 0,
  normalPrice = 0,
}) {
  console.log(
    '👾 %c count ',
    'background-color: #d73d32; color: white;',
    count
  );

  if (count < amount) {
    return count * normalPrice;
  }

  return count * specialPrice;
}
