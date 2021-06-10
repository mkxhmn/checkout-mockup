import {
  Box,
  Card,
  CardActions,
  CardContent,
  Fade,
  Icon,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Add, LocalOffer, RemoveOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useMemo } from 'react';

const useAdsStyles = makeStyles((theme) => ({
  cardActions: {
    paddingLeft: theme.spacing(2),
    justifyContent: 'space-between',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  icon: {
    marginLeft: theme.spacing(0.5),
  },
}));

export function PricingCard(props) {
  const classes = useAdsStyles();

  const addCartItem = useStoreActions(({ cart }) => cart.addCartItem);
  const removeCartItem = useStoreActions(({ cart }) => cart.removeCartItem);
  const totalPerCartItem = useStoreState(({ cart }) => cart.totalPerCartItem);
  const totalPricePerCartItem = useStoreState(
    ({ cart }) => cart.totalPricePerCartItem
  );
  const company = useStoreState(({ company }) => company.company);

  const isDiscountApplied = useMemo(
    () => totalPricePerCartItem[props.tier]?.isDiscountApplied ?? false,
    [totalPricePerCartItem]
  );

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

  const price = useMemo(() => {
    if (!isDiscountApplied) {
      return props.price;
    }

    // only update price for drop
    return company.discounts?.[props.tier]?.type === 'drop'
      ? company.discounts?.[props.tier]?.rules?.to
      : props.price;
  }, [isDiscountApplied, company]);

  return (
    <Card>
      <CardContent>
        <Box>
          <Typography
            variant="h6"
            className={classes.capitalize}
            component="span"
          >
            {props.tier}
          </Typography>
          <Fade in={isDiscountApplied} mountOnEnter unmountOnExit>
            <Icon fontSize="inherit" color="primary" className={classes.icon}>
              <LocalOffer style={{ fontSize: '16px' }} />
            </Icon>
          </Fade>
        </Box>
        <Typography variant="subtitle1">{props.description}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Typography component="span">
          <strong>{price}</strong>
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
