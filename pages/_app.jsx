import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import '../styles/globals.css'
import { StoreProvider } from '../context/Store'
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../src/createEmotionCache';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { GeistProvider, CssBaseline } from '@geist-ui/core'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache}) {
  return (
    <CacheProvider value={emotionCache}>
      <StoreProvider >
        <PayPalScriptProvider deferLoading={true}>
          <Head>
            <title>TiPancarte</title>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          <GeistProvider>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </GeistProvider>
        </PayPalScriptProvider>
      </StoreProvider>
    </CacheProvider>
  )
}

export default MyApp
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
