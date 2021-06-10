import { action, computed } from 'easy-peasy';
import { priceDealCalculator } from '../../utility/priceDealCalculator';
import { priceDropCalculator } from '../../utility/priceDropCalculator';

export default {
  cartItem: [],

  addCartItem: action((state, payload = '') => {
    state.cartItem.push(payload);
  }),

  removeCartItem: action((state, payload) => {
    if (state.cartItem.includes(payload)) {
      state.cartItem.splice(state.cartItem.indexOf(payload), 1);
    }
  }),

  totalPerCartItem: computed([(state) => state.cartItem], (cartItem) => {
    if (!cartItem.length) {
      return {};
    }

    const items = [...new Set(cartItem)];
    return items.reduce(
      (acc, tier) => ({
        ...acc,
        [tier]: cartItem.filter((item) => item === tier).length,
      }),
      {}
    );
  }),

  isCartEmpty: computed(
    [(state) => state.cartItem],
    (cartItem) => cartItem.length === 0
  ),

  totalPricePerCartItem: computed(
    [
      (state) => state.totalPerCartItem,
      (state, storeState) => storeState.company.company,
      (state, storeState) => storeState.products,
    ],
    (totalPerCartItem, company, products) => {
      const tiers = Object.keys(totalPerCartItem);

      if (!tiers.length) {
        return [];
      }

      /**
       * totalPerCartItem[tier] is the amount(s) of item per tier in cart
       */
      if (!company.discounts) {
        return tiers.map((tier) => ({
          tier,
          isDiscountApplied: false,
          totalPrice: totalPerCartItem[tier] * products[tier].price,
        }));
      }

      return tiers.map((tier) => {
        switch (company.discounts?.[tier]?.type) {
          case 'deal':
            return {
              tier,
              ...priceDealCalculator({
                amount: company.discounts[tier].rules.amount,
                count: totalPerCartItem[tier],
                to: company.discounts[tier].rules.to,
                price: products[tier].price,
              }),
            };
          case 'drop':
            return {
              tier,
              ...priceDropCalculator({
                amount: company.discounts[tier].rules.amount,
                count: totalPerCartItem[tier],
                to: company.discounts[tier].rules.to,
                normalPrice: products[tier].price,
                specialPrice: company.discounts[tier].rules.to,
              }),
            };
          default:
            return {
              tier,
              totalPrice: totalPerCartItem[tier] * products[tier].price,
            };
        }
      });
    }
  ),
};
