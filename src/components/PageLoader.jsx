import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { useStoreRehydrated } from 'easy-peasy';
import { Container, Typography } from '@material-ui/core';

export function PageLoader({ children }) {
  const isRehydrated = useStoreRehydrated();

  if (!isRehydrated) {
    return (
      <Container>
        <Typography>Loading</Typography>
      </Container>
    );
  }

  return <Fragment>{children}</Fragment>;
}

PageLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
