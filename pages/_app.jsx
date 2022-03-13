import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import AOS from 'aos';
import 'aos/dist/aos.css'
import '../styles/globals.css'
import { StoreProvider } from '../context/Store'
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { GeistProvider, CssBaseline } from '@geist-ui/core'

function MyApp({ Component, pageProps}) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  });
  
  return (
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
  )
}

export default MyApp
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
