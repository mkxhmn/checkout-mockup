import {
  Box,
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

const useDrawerStyles = makeStyles((theme) => ({
  drawer: {
    width: theme.breakpoints.values.sm,
    minHeight: '100%',
    position: 'relative',

    [theme.breakpoints.down('sm')]: {
      width: '100vw',
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export function CartDrawer() {
  const classes = useDrawerStyles();

  const isShowCart = useStoreState(({ common }) => common.isShowCart);
  const hideCart = useStoreActions(({ common }) => common.hideCart);
  const products = useStoreState(({ products }) => products);
  const company = useStoreState(({ company }) => company.company);
  const isCartEmpty = useStoreState(({ cart }) => cart.isCartEmpty);

  const productsList = useMemo(
    () =>
      Object.entries(products).map(([tier, details]) => ({
        tier,
        ...details,
      })),
    [products]
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
            Cart {'- ' + company.name}
          </Typography>
        </Box>
        {isCartEmpty ? (
          <EmptyCart />
        ) : (
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
        )}{' '}
      </Container>
    </Drawer>
  );
}
