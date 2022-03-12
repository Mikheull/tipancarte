import Head from 'next/head'
import Footer from '../components/Footer'
import Header from './Header'

function Layout({ actual, title, description, children }) {

    return (
        <div>
            <Head>
                <title> {title ? `TiPancarte - ${title} ` : 'TiPancarte '} </title>
                <meta name="description" content={description ? description : "Découvrez les pancartes personnalisable et commandez la votre en utilisant notre outil de configuration. Les pancartes style martinique sont faites 100% manuellement et livrée dans toute la France"} />
                <link rel="icon" href="/favicon.ico" />

                {/* Axeptio integration */}
                <script
                    dangerouslySetInnerHTML={{
                    __html: `
                        window.axeptioSettings = {
                            clientId: "622cca37447787b78624eb67",
                        };
                        
                        (function(d, s) {
                            var t = d.getElementsByTagName(s)[0], e = d.createElement(s);
                            e.async = true; e.src = "//static.axept.io/sdk.js";
                            t.parentNode.insertBefore(e, t);
                        })(document, "script");
                    `,
                    }}
                />
                {/* Google Analytics integration */}
                <script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=G-QC95VHZFC7`}
                />
                <script
                    dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-QC95VHZFC7', {
                        page_path: window.location.pathname,
                    });
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
    )
}

export default Layout
