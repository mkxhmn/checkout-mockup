import { createStore, persist } from 'easy-peasy';
import cart from './cart';
import products from './products';
import company from './company';
import common from './common';

export default createStore(
  persist(
    {
      cart,
      products,
      company,
      common,
    },
    {
      storage: 'localStorage',
    }
  ),
  {
    name: 'checkout-store-mockup',
    devTools: process.env.NODE_ENV === 'production',
  }
);
