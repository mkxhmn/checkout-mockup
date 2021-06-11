import { Box, Typography } from '@material-ui/core';
import EmptyAsset from '../../../../../public/static/empty.svg';

export function EmptyCart() {
  return (
    <Box
      width="70%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      margin="auto"
      marginTop="30%"
    >
      <EmptyAsset />
      <Typography align="center">your cart is empty 🍃</Typography>
    </Box>
  );
}
