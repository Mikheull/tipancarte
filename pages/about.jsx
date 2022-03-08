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
                <Collapse title="Question A">
                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
                </Collapse>
                <Collapse title="Question B">
                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
                </Collapse>
                <Collapse title="Question C">
                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
                </Collapse>
                <Collapse title="Question D">
                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
                </Collapse>
                <Collapse title="Question E">
                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
                </Collapse>
            </Collapse.Group>

            <Spacer h={5} />

            <ClientReview />
        </div>
    </Layout>
  )
}