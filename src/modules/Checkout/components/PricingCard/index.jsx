import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Add, RemoveOutlined } from '@material-ui/icons';
import * as PropTypes from 'prop-types';
import { useStoreActions } from 'easy-peasy';

const useAdsStyles = makeStyles((theme) => ({
  cardActions: {
    paddingLeft: theme.spacing(2),
    justifyContent: 'space-between',
  },
}));

export function PricingCard(props) {
  const classes = useAdsStyles();

  const addCartItem = useStoreActions(({ cart }) => cart.addCartItem);
  const removeCartItem = useStoreActions(({ cart }) => cart.removeCartItem);

  /**
   * @param {String} tier
   */
  const handleAddCartItem = (tier) => () => {
    addCartItem(tier);
  };
  const handleRemoveCartItem = (tier) => () => {
    removeCartItem(tier);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{props.tier}</Typography>
        <Typography variant="subtitle1">{props.description}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Typography>
          <strong>{props.price}</strong>
        </Typography>
        <Box>
          <IconButton onClick={handleRemoveCartItem(props.tier)}>
            <RemoveOutlined />
          </IconButton>
          <IconButton onClick={handleAddCartItem(props.tier)}>
            <Add />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
}

PricingCard.propTypes = {
  description: PropTypes.string,
  price: PropTypes.number,
  tier: PropTypes.string,
};
