import PropTypes from 'prop-types';
import React from 'react';
import { useStoreRehydrated } from 'easy-peasy';
import { Container, makeStyles, Typography } from '@material-ui/core';

const usePageLoaderStyles = makeStyles(() => ({
  container: {
    minHeight: '100vh',
  },
}));
export function PageLoader({ children }) {
  const classes = usePageLoaderStyles();

  const isRehydrated = useStoreRehydrated();

  if (!isRehydrated) {
    return (
      <Container className={classes.container}>
        <Typography>Loading</Typography>
      </Container>
    );
  }

  return <Container className={classes.container}>{children}</Container>;
}

PageLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
