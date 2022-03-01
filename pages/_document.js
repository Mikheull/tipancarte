// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Poppins:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700,900&display=swap"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="https://unpkg.com/swiper@6.6.2/swiper-bundle.min.css" />
          <meta name="title" content="TiPancarte" key="title" />
          <meta name="description" content="" />
          <meta property="og:title" content="TiPancarte" />
          <meta property="og:image" content="https://www.tipancarte.fr/images/48FF448F-2010-4FFA-A6C3-7B2F4A4CDEBD_1_105_c.jpeg" />
          <meta property="og:description" content="" />
          <meta property="og:url" content="https://www.tipancarte.fr" />
          <meta property="twitter:title" content="TiPancarte" />
          <meta name="twitter:creator" content="Mikhael Bailly" />
          <meta property="twitter:image" content="https://www.tipancarte.fr/images/48FF448F-2010-4FFA-A6C3-7B2F4A4CDEBD_1_105_c.jpeg" />
          <meta property="twitter:description" content="" />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
