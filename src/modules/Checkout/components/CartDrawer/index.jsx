import {
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { CloseOutlined } from '@material-ui/icons';
import { PricingCard } from '../PricingCard';
import { useMemo } from 'react';
import { EmptyCart } from './EmptyCart';
import { formatPrice } from '../../../../utility/formatPrice';

const useDrawerStyles = makeStyles((theme) => ({
  drawer: {
    width: theme.breakpoints.values.sm,
    position: 'relative',
    height: '100vh',

    [theme.breakpoints.down('sm')]: {
      width: '100vw',
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  totalPrice: {
    textAlign: 'end',
  },
}));

export function CartDrawer() {
  const classes = useDrawerStyles();

  const isShowCart = useStoreState(({ common }) => common.isShowCart);
  const hideCart = useStoreActions(({ common }) => common.hideCart);
  const products = useStoreState(({ products }) => products);
  const company = useStoreState(({ company }) => company.company);
  const isCartEmpty = useStoreState(({ cart }) => cart.isCartEmpty);
  const totalPricePerCartItem = useStoreState(
    ({ cart }) => cart.totalPricePerCartItem
  );
  const cartItem = useStoreState(({ cart }) => cart.cartItem);

  const productsList = useMemo(() => {
    const items = [...new Set(cartItem)];

    return Object.entries(products)
      .map(([tier, details]) => ({
        tier,
        ...details,
      }))
      .filter(({ tier }) => items.includes(tier));
  }, [cartItem, products]);

  const totalPrice = useMemo(
    () =>
      Object.values(totalPricePerCartItem).reduce(
        (acc, { totalPrice }) => acc + totalPrice,
        0
      ),
    [totalPricePerCartItem]
  );

  function handleClose() {
    hideCart();
  }

  return (
    <Drawer anchor="right" open={isShowCart} onClose={handleClose}>
      <Container className={classes.drawer}>
        <Box display="flex" flexDirection="row" className={classes.header}>
          <IconButton onClick={handleClose}>
            <CloseOutlined />
          </IconButton>
          <Typography component="div" variant="h6">
            Cart {company?.name ? '- ' + company?.name : ''}
          </Typography>
        </Box>
        {isCartEmpty ? (
          <EmptyCart />
        ) : (
          <Box
            display="flex"
            alignItems="space-between"
            height="calc(100vh-48px)"
            flexDirection="column"
          >
            <Grid container spacing={1}>
              {productsList.map(({ tier, price, description }) => (
                <Grid item xs={12} key={tier}>
                  <PricingCard
                    disableElevation
                    tier={tier}
                    description={description}
                    price={price}
                  />
                  <Divider />
                </Grid>
              ))}
            </Grid>
            <Box display="flex" flexDirection="column">
              <Box my={2}>
                <Grid container>
                  <Grid item xs>
                    <Typography variant="h6">Total</Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography className={classes.totalPrice} variant="h6">
                      {formatPrice(totalPrice)}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Button fullWidth variant="contained" color="primary">
                Purchase
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </Drawer>
  );
}
