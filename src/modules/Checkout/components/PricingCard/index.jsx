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
import { formatPrice } from '../../../../utility/formatPrice';

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
    () =>
      company.discounts?.[props.tier]?.rules?.amount === 1 ||
      Boolean(totalPricePerCartItem[props.tier]?.isDiscountApplied),
    [totalPricePerCartItem, company]
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

  const isDiscountIncluded = useMemo(
    () => Boolean(company.discounts),
    [company]
  );

  const price = useMemo(() => {
    if (
      !isDiscountIncluded ||
      company.discounts?.[props.tier]?.type !== 'drop'
    ) {
      return props.price;
    }

    if (
      !isDiscountApplied &&
      company.discounts?.[props.tier]?.rules?.amount !== 1
    ) {
      return props.price;
    }

    // only update price for drop
    return company.discounts?.[props.tier]?.rules?.to;
  }, [isDiscountIncluded, isDiscountApplied, company]);

  const discountMessage = useMemo(() => {
    if (!company.discounts) {
      return '';
    }

    const { amount, to } = company.discounts?.[props.tier]?.rules ?? {};
    switch (company.discounts?.[props.tier]?.type) {
      case 'drop': {
        return `🎉 purchase ${amount} or more to enjoy ${to} price drop`;
      }
      case 'deal': {
        return `🎉 purchase ${amount} or more to enjoy ${amount} for ${to} deal`;
      }
      default:
        return '';
    }
  }, [company]);

  return (
    <Card elevation={props.disableElevation ? 0 : 1}>
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
        <Typography variant="overline">{discountMessage}</Typography>
        <Typography variant="subtitle1">{props.description}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Typography component="span">
          <strong>{formatPrice(price)}</strong>
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
  disableElevation: PropTypes.bool,
  price: PropTypes.number,
  tier: PropTypes.string,
};

PricingCard.defaultProps = {
  disableElevation: false,
};
