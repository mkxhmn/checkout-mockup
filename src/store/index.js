import { createStore, persist } from 'easy-peasy';
import cart from './cart';
import products from './products';
import company from './company';

export default createStore(
  persist(
    {
      cart,
      products,
      company,
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
