import {
  AppBar,
  Box,
  Container,
  IconButton,
  makeStyles,
  Toolbar,
} from '@material-ui/core';
import { ShoppingCartOutlined } from '@material-ui/icons';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { CompanyMenu } from './CompanyMenu';
import dynamic from 'next/dynamic';

const Badge = dynamic(() => import('@material-ui/core/Badge'), { ssr: false });

const useTopBarLayout = makeStyles(() => ({
  appBarLayout: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export function TopBar() {
  const classes = useTopBarLayout();
  const showCart = useStoreActions(({ common }) => common.showCart);
  const isCartEmpty = useStoreState(({ cart }) => cart.isCartEmpty);

  function handleShowCart() {
    showCart();
  }

  return (
    <AppBar position="sticky" color="transparent" elevation={0}>
      <Toolbar disableGutters>
        <Container className={classes.appBarLayout}>
          <Box>
            <CompanyMenu />
            <IconButton onClick={handleShowCart}>
              <Badge color="secondary" variant="dot" invisible={isCartEmpty}>
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
