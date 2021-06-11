const title = 'Checkout Mockup by mkxhmn';
const description =
  'A simple checkout page layout mockup. Be free to explore the manifested ideas and thoughts applied in the design and development.';
const images = [
  {
    url: 'https://source.unsplash.com/3LTht2nxd34/1200x628',
    width: 1200,
    height: 628,
    alt: 'image alt',
  },
];

export default {
  title,
  description,
  openGraph: {
    url: 'https://checkout-landing-page.vercel.app',
    type: 'website',
    title,
    description,
    images,
    site_name: title,
    profile: {
      firstName: 'mkxhmn',
    },
  },
  twitter: {
    cardType: 'summary_large_image',
  },
};
