import {
  Box,
  Container,
  Drawer,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { CloseOutlined } from '@material-ui/icons';

const useDrawerStyles = makeStyles((theme) => ({
  drawer: {
    width: theme.breakpoints.values.sm,

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
            Cart
          </Typography>
        </Box>
      </Container>
    </Drawer>
  );
}
