import { action } from 'easy-peasy';

export default {
  companies: [
    {
      name: 'UEM Sunrise',
      discounts: {
        standard: {
          type: 'deal',
          rules: { amount: 3, to: 2 },
        },
      },
    },
    {
      name: 'Sime Darby Property Bhd',
      discounts: {
        featured: {
          type: 'drop',
          rules: { amount: 1, to: 299.99 },
        },
      },
    },
    {
      name: 'Mah Sing Group',
      discounts: {
        standard: {
          type: 'deal',
          rules: { amount: 5, to: 4 },
        },
        featured: {
          type: 'drop',
          rules: { amount: 4, to: 299.99 },
        },
        premium: {
          type: 'drop',
          rules: { amount: 3, to: 389.99 },
        },
      },
    },
    { name: 'default' },
  ],

  company: {},

  setCompany: action((state, payload = {}) => {
    state.company = payload;
  }),
};
