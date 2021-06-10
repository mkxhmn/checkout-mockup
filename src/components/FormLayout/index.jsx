import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@material-ui/core';

export function FormLayout(props) {
  return (
    <Box mt={4}>
      <Box mt={2}>
        <Grid container spacing={2}>
          <Grid item sm={4}>
            <Typography variant="h5">{props.title}</Typography>
            <Typography variant="subtitle1">{props.description}</Typography>
          </Grid>
          <Grid item sm={8}>
            <Typography variant="h5">{props.contentTitle}</Typography>
            {props.children}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

FormLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  contentTitle: PropTypes.string,
  description: PropTypes.string,
  header: PropTypes.string,
  title: PropTypes.string,
};
