import Head from 'next/head'
import Footer from '../components/Footer'
import Header from './Header'

function Layout({ actual, title, description, children }) {

    return (
        <>
            <noscript>
                <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-542RP25" height="0" width="0" style={{display: 'none', visibility: 'hidden'}}></iframe>
            </noscript>
            <div>
                <Head>
                    <title> {title ? `TiPancarte - ${title} ` : 'TiPancarte '} </title>
                    <meta name="description" content={description ? description : "Découvrez les pancartes personnalisable et commandez la votre en utilisant notre outil de configuration. Les pancartes style martinique sont faites 100% manuellement et livrée dans toute la France"} />
                    <link rel="icon" href="/favicon.ico" />

                    {/* Google Tag Manager integration */}
                    <script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=G-QC95VHZFC7`}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                        __html: `
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-542RP25');
                        `,
                        }}
                    />
                </Head>

                <Header actual={actual}/>
                <div>
                    {children}
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Layout
