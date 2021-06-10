import PropTypes from 'prop-types';
import { Box, Divider, Typography } from '@material-ui/core';

export function PageContainer(props) {
  return (
    <Box mt={4}>
      <Typography variant="h4">
        <strong>{props.title}</strong>
      </Typography>
      <Divider />
      <Box mt={2}>{props.children}</Box>
    </Box>
  );
}

PageContainer.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

PageContainer.defaultProps = {
  children: 'Page Title',
};
