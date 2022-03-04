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
          <link rel="stylesheet" href="https://unpkg.com/swiper@6.6.2/swiper-bundle.min.css" />
          <meta name="title" content="TiPancarte" key="title" />
          <meta name="description" content="Découvrez les pancartes personnalisable et commandez la votre en utilisant notre outil de configuration. Les pancartes style martinique sont faites 100% manuellement et livrée dans toute la France" />
          <meta property="og:title" content="TiPancarte" />
          <meta property="og:image" content="https://www.tipancarte.fr/brand/og_banner.jpg" />
          <meta property="og:description" content="Découvrez les pancartes personnalisable et commandez la votre en utilisant notre outil de configuration. Les pancartes style martinique sont faites 100% manuellement et livrée dans toute la France" />
          <meta property="og:url" content="https://www.tipancarte.fr" />
          <meta property="twitter:title" content="TiPancarte" />
          <meta name="twitter:creator" content="Mikhael Bailly" />
          <meta property="twitter:image" content="https://www.tipancarte.fr/brand/og_banner.jpg" />
          <meta property="twitter:description" content="Découvrez les pancartes personnalisable et commandez la votre en utilisant notre outil de configuration. Les pancartes style martinique sont faites 100% manuellement et livrée dans toute la France" />
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
