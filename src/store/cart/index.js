import { action } from 'easy-peasy';

export default {
  cartItem: [],

  setCartItem: action((state, payload = []) => {
    state.cartItem = payload;
  }),
};
