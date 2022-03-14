import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr">
        <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8"/>
            {/* <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes"/> */}

            <meta name="language" content="fr"/>
            <meta name="author" content="Mikhael Bailly"/>
            <meta name="category" content="ecommerce"/>
            <meta name="theme-color" content="#FFFFFF"/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content="https://tipancarte.fr"/>
            <meta property="twitter:url" content="https://tipancarte.fr"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// MyDocument.getInitialProps = async (ctx) => {
//   const originalRenderPage = ctx.renderPage;

//   ctx.renderPage = () =>
//     originalRenderPage({
//       // eslint-disable-next-line react/display-name
//       enhanceApp: (App) => (props) => <App {...props} />,
//     });

//     const initialProps = await Document.getInitialProps(ctx);
  
//     return {
//       ...initialProps,
//       // Styles fragment is rendered after the app and page rendering finish.
//       styles: [...React.Children.toArray(initialProps.styles)],
//     };
//   };
