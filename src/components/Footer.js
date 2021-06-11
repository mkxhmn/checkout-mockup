import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useFooterStyles = makeStyles((theme) => ({
  footer: {
    position: 'fixed',
    bottom: 0,

    [theme.breakpoints.down('xs')]: {
      position: 'unset',
      marginTop: theme.spacing(2),
    },
  },
}));

export function Footer() {
  const classes = useFooterStyles();
  return (
    <footer className={classes.footer}>
      <Container>
        <Typography variant="overline">v1.0.1</Typography>
      </Container>
    </footer>
  );
}
