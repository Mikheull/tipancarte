import Head from 'next/head'
import Header from './admin/Header'
function LayoutAdmin({ title, description, children, actual }) {

    return (
        <div>
            <Head>
                <title> {title ? `TiPancarte Admin - ${title} ` : 'TiPancarte Admin '} </title>
                <meta name="description" content={description ? description : "Découvrez les pancartes personnalisable et commandez la votre en utilisant notre outil de configuration. Les pancartes style martinique sont faites 100% manuellement et livrée dans toute la France"} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header actual={actual}/>
            <div className="container">
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default LayoutAdmin
