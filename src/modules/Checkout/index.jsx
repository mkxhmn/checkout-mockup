import { Grid } from '@material-ui/core';
import { useStoreState } from 'easy-peasy';
import { Fragment, useMemo } from 'react';
import { PricingCard } from './components/PricingCard';
import { PageContainer } from '../../components/PageContainer';
import { FormLayout } from '../../components/FormLayout';
import { CartDrawer } from './components/CartDrawer';

const Checkout = () => {
  const products = useStoreState(({ products }) => products);

  const productsList = useMemo(
    () =>
      Object.entries(products).map(([tier, details]) => ({
        tier,
        ...details,
      })),
    [products]
  );

  return (
    <Fragment>
      <PageContainer title="Purchase">
        <FormLayout
          title="Ads Program"
          description="Stay on top in this competitive market with our ads program, from
              our survey in 2020, we help over 100 companies to boost their
              annual sales by 30%."
          contentTitle="Tier"
        >
          <Grid container spacing={1}>
            {productsList.map(({ tier, price, description }) => (
              <Grid item xs={12} key={tier}>
                <PricingCard
                  tier={tier}
                  description={description}
                  price={price}
                />
              </Grid>
            ))}
          </Grid>
        </FormLayout>
      </PageContainer>
      <CartDrawer />
    </Fragment>
  );
};

export default Checkout;
