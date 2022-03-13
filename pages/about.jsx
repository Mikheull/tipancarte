import Layout from '../components/Layout'
import ClientReview from '../components/shop/ClientReview.jsx'
import {Spacer, Collapse, Text } from '@geist-ui/core'

export default function About() {

  return (
    <Layout title="A propos" actual="about">
        <div className="py-6 mx-auto max-w-7xl md:px-4 px-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Hero content */}
                <div className="pt-10 pb-12 md:pt-40 md:pb-20">
                    {/* Section header */}
                    <div className="text-center pb-12 md:pb-16">
                        <Text h1 className='text-5xl font-bitter md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4' data-aos="zoom-y-out">A propos de TiPancarte</Text>
                        <div className="max-w-3xl mx-auto">
                            <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida ac tellus id porttitor.</p>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-col justify-center">
                    <img className="mx-auto w-full" src="/images/hero_image.jpg" alt="Hero" />
                </div>
            </div>
            
            <Spacer h={5} />
            <Collapse.Group>
                <Collapse title="Dans combien de temps receverai-je ma pancarte ?">
                    <Text>La durée change en fonction du nombre de commande. En général une commande est réalisée en 3 jours et envoyée sous 5 à 7 jours selon notre transporteur.<br/> Une fois votre commande validée vous receverez un email pour vous indiquer les étapes de réalisation.</Text>
                </Collapse>
                <Collapse title="Je ne trouve pas une référence de couleur">
                    <Text>Nous publions régulièrement, sur Instagram, des idées de pancartes avec des couleurs et leurs référence. Il se peut que vous ne les trouviez pas dans le configurateur, en effet les couleurs sont sélectionnées en fonction de notre stock et tournent au fur et à mesure.</Text>
                </Collapse>
                <Collapse title="Comment sera livré ma pancarte ?">
                    <Text>Votre TiPancarte vous seras livrée en poins relais avec notre transporteur &quot;Mondial relais&quot; sous 5 à 7 jours.</Text>
                </Collapse>
                <Collapse title="La pancarte est elle totalement peinte ?">
                    <Text>Oui, nous peignons entièrement la pancarte et arrondissons les bords pour un coté agréable au toucher.</Text>
                </Collapse>
                <Collapse title="Comment faire un retour">
                    <Text>Nous ne pouvons malheureusement pas accepter le retour de votre produit personnalisé. En cas de problème avec votre commande, contactez nous par email !</Text>
                </Collapse>
            </Collapse.Group>

            <Spacer h={5} />

            <ClientReview />
        </div>
    </Layout>
  )
}