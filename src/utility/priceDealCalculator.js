/**
 * calculate deals based on set of rules
 * @param {Number} amount - amount of item to validate the discount
 * @param {Number} count - current item count
 * @param {Number} to - deal
 * @param {Number} price
 * @returns {number}
 */
export function priceDealCalculator({
  amount = 0,
  count = 0,
  to = 0,
  price = 0,
}) {
  if (count < amount) {
    return price;
  }

  return (Math.floor(count / amount) + (count % amount)) * to * price;
}
