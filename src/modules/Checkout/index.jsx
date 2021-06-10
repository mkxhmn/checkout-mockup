import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useStoreState } from 'easy-peasy';
import { useMemo } from 'react';
import { Add } from '@material-ui/icons';

const useAdsStyles = makeStyles((theme) => ({
  cardActions: {
    paddingLeft: theme.spacing(2),
    justifyContent: 'space-between',
  },
}));

const Checkout = () => {
  const classes = useAdsStyles();

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
    <Box mt={4}>
      <Typography variant="h4">
        <strong>Purchase</strong>
      </Typography>
      <Divider />
      <Box mt={2}>
        <Grid container spacing={2}>
          <Grid item sm={4}>
            <Typography variant="h5">Ads Program</Typography>
            <Typography variant="subtitle1">
              Stay on top in this competitive market with our ads program, from
              our survey in 2020, we help over 100 companies to boost their
              annual sales by 30%.
            </Typography>
          </Grid>
          <Grid item sm={8}>
            <Typography variant="h5">Tier</Typography>
            <Grid container spacing={1}>
              {productsList.map(({ tier, price, description }) => (
                <Grid item xs={12} key={tier}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{tier}</Typography>
                      <Typography variant="subtitle1">{description}</Typography>
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                      <Typography>
                        <strong>{price}</strong>
                      </Typography>
                      <Box>
                        <IconButton size="small">
                          <Add />
                        </IconButton>
                      </Box>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Checkout;
