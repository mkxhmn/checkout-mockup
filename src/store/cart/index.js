import { action, computed } from 'easy-peasy';

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
};
