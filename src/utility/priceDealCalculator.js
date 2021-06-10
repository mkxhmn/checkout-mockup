/**
 * calculate deals based on set of rules
 * @param {Number} amount - amount of item to validate the discount
 * @param {Number} count - current item count
 * @param {Number} to - deal
 * @param {Number} price
 * @returns {{totalPrice: Number, isDiscountApplied: boolean}}
 */
export function priceDealCalculator({
  amount = 0,
  count = 0,
  to = 0,
  price = 0,
}) {
  if (count < amount) {
    return {
      isDiscountApplied: false,
      totalPrice: price,
    };
  }

  return {
    isDiscountApplied: true,
    totalPrice: (Math.floor(count / amount) + (count % amount)) * to * price,
  };
}
