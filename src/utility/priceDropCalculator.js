/**
 * calculate price drop based on rules
 * @param {Number} amount
 * @param {Number} count
 * @param {Number} to
 * @param {Number} specialPrice
 * @param {Number} normalPrice
 * @returns {{totalPrice: Number, isDiscountApplied: boolean}}
 */
export function priceDropCalculator({
  amount = 0,
  count = 0,
  to = 0,
  specialPrice = 0,
  normalPrice = 0,
}) {
  if (count < amount) {
    return {
      isDiscountApplied: false,
      totalPrice: count * normalPrice,
    };
  }

  return {
    isDiscountApplied: true,
    totalPrice: count * specialPrice,
  };
}
