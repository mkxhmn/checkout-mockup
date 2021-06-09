import { createStore, persist } from 'easy-peasy';
import cart from './cart';
import products from './products';

export default createStore(
  persist(
    {
      cart,
      products,
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
