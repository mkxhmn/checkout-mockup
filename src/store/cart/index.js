import { action } from 'easy-peasy';

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
};
