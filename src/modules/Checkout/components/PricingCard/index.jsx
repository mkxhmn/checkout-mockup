import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import * as PropTypes from 'prop-types';

const useAdsStyles = makeStyles((theme) => ({
  cardActions: {
    paddingLeft: theme.spacing(2),
    justifyContent: 'space-between',
  },
}));

export function PricingCard(props) {
  const classes = useAdsStyles();

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
          <IconButton size="small">
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
