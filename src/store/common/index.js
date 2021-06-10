import { action } from 'easy-peasy';

export default {
  isShowCart: false,

  showCart: action((state) => {
    state.isShowCart = true;
  }),
  hideCart: action((state) => {
    state.isShowCart = false;
  }),
};
