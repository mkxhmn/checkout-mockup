import {
  Box,
  Card,
  CardActions,
  CardContent,
  Fade,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Add, RemoveOutlined } from '@material-ui/icons';
import * as PropTypes from 'prop-types';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useMemo } from 'react';

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
  const totalPerCartItem = useStoreState(({ cart }) => cart.totalPerCartItem);

  /**
   * @param {String} tier
   */
  const handleAddCartItem = (tier) => () => {
    addCartItem(tier);
  };

  /**
   * @param {String} tier
   */
  const handleRemoveCartItem = (tier) => () => {
    removeCartItem(tier);
  };

  const isShowRemoveButton = useMemo(
    () => Boolean(totalPerCartItem[props.tier]),
    [totalPerCartItem[props.tier]]
  );

  const total = useMemo(
    () => totalPerCartItem[props.tier],
    [totalPerCartItem[props.tier]]
  );

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
        <Box display="flex" alignItems="center">
          <Fade in={isShowRemoveButton} mountOnEnter unmountOnExit>
            <IconButton onClick={handleRemoveCartItem(props.tier)}>
              <RemoveOutlined />
            </IconButton>
          </Fade>
          <Fade in={isShowRemoveButton} mountOnEnter unmountOnExit>
            <Typography>{total}</Typography>
          </Fade>
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
