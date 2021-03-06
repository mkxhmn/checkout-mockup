import SEO from '../seo.config';
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../config/theme';
import store from '../src/store';
import { StoreProvider } from 'easy-peasy';
import { PageLoader } from '../src/components/PageLoader';
import { TopBar } from '../src/components/TopBar';
import { Footer } from '../src/components/Footer';
import Favicon from '../public/static/favicon.ico';
import { DefaultSeo } from 'next-seo';

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <DefaultSeo {...SEO} />
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="shortcut icon" href={Favicon} />
      </Head>
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <TopBar />
          <PageLoader>
            <Component {...pageProps} />
          </PageLoader>
          <Footer />
        </ThemeProvider>
      </StoreProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
