import { createStore, persist } from 'easy-peasy';
import cart from './cart';

export default createStore(
  persist(
    {
      cart,
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
