import {
  AppBar,
  Box,
  Container,
  IconButton,
  makeStyles,
  Toolbar,
} from '@material-ui/core';
import { ShoppingCartOutlined } from '@material-ui/icons';
import { useStoreActions } from 'easy-peasy';

const useTopBarLayout = makeStyles(() => ({
  appBarLayout: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export function TopBar() {
  const classes = useTopBarLayout();
  const showCart = useStoreActions(({ common }) => common.showCart);

  function handleShowCart() {
    showCart();
  }

  return (
    <AppBar position="sticky" color="transparent" elevation={0}>
      <Toolbar disableGutters>
        <Container className={classes.appBarLayout}>
          <Box>
            <IconButton onClick={handleShowCart}>
              <ShoppingCartOutlined />
            </IconButton>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
