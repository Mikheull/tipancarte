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
