import React, { useState, useRef, useEffect } from 'react';
import ClientReview from '../components/shop/ClientReview.jsx'
import Social from '../components/shop/Social.jsx'
import Layout from '../components/Layout'
import { Text, Spacer, Link } from '@geist-ui/core'
import Transition from '../utils/Transition';

export default function Home() {
  const [tab, setTab] = useState(1);
  const tabs = useRef(null);

  const heightFix = () => {
    if (tabs.current.children[tab]) {
      tabs.current.style.height = tabs.current.children[tab - 1].offsetHeight + 'px'
    }
  }

  useEffect(() => {
    heightFix()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  return (
    <Layout actual="index">
      <div className="mx-auto max-w-7xl md:px-4 px-0">

        <section className="relative">
          {/* Illustration behind hero content */}
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none" aria-hidden="true">
            <svg width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg" data-aos="zoom-y-out" data-aos-delay="450">
                <defs>
                  <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="hp-hero">
                      <stop stopColor="#FFF" offset="0%" />
                      <stop stopColor="#EAEAEA" offset="77.402%" />
                      <stop stopColor="#DFDFDF" offset="100%" />
                  </linearGradient>
                </defs>
                <g fill="url(#hp-hero)" fillRule="evenodd">
                  <circle cx="1232" cy="128" r="128" />
                  <circle cx="155" cy="443" r="64" />
                </g>
            </svg>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {/* Hero content */}
            <div className="pt-10 pb-12 md:pt-40 md:pb-20">
              {/* Section header */}
              <div className="text-center pb-12 md:pb-16">
                <Text h1 className='text-5xl font-bitter md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4' data-aos="zoom-y-out">Créez vos <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-violet-400">pancartes</span></Text>
                <div className="max-w-3xl mx-auto">
                  <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida ac tellus id porttitor.</p>
                </div>
              </div>

              {/* Hero image */}
              <div>
                <div className="relative flex justify-center mb-8" data-aos="zoom-y-out" data-aos-delay="450">
                    <div className="flex flex-col justify-center">
                    <img className="mx-auto" src="/images/hero_image.jpg" width="768" height="432" alt="Hero" />
                  </div>
                  <Link href='shop' className='absolute top-full'>
                    <a className="text-black flex items-center transform -translate-y-1/2 bg-white rounded-full font-medium group p-4 shadow-lg">
                      <span className="ml-3">Commencer dès maintenant</span>
                    </a>
                  </Link>
                  
                </div>
              </div>

            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl md:px-0 px-10" data-aos="zoom-y-out" data-aos-delay="250">
          <div className='my-4 text-center'>
            <Text h2 className='font-bitter text-5xl'>A propos de nous</Text>
            <div className='w-full md:w-2/3 mx-auto'>
              <Text p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida ac tellus id porttitor. Nunc sollicitudin fringilla ante sit amet fermentum. Fusce viverra ex non leo tincidunt, id luctus arcu cursus. Donec vulputate quam nisl. Phasellus sodales pretium lectus, eget ullamcorper dolor sodales eget</Text>
            </div>
          </div>
        </div>

        <Spacer h={10}/>
        <section className="relative">
          {/* Section background (needs .relative class on parent and next sibling elements) */}
          <div className="absolute inset-0 bg-gray-50 pointer-events-none mb-16" aria-hidden="true"></div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-12 md:pt-20">

                {/* Section header */}
                <Text h2 className='font-bitter '>Notre process</Text>

                {/* Section content */}
                <div className="md:grid md:grid-cols-12 md:gap-6">
                  {/* Content */}
                  <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6" data-aos="fade-right">
                    {/* Tabs buttons */}
                    <div className="mb-8 md:mb-0">
                      <a
                          className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${tab !== 1 ? 'bg-white border-gray-200' : 'bg-gray-100 border-gray-200'}`}
                          href="#0"
                          onClick={(e) => { e.preventDefault(); setTab(1); }}
                      >
                        <div>
                          <div className="font-bold leading-snug tracking-tight mb-1 text-gray-900">Découpe et ponçage des planches</div>
                          <div className="text-gray-600">Nous découpons nos planches en forme de flèches et les ponçons pour les rendre agréable au toucher.</div>
                        </div>
                        <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                          <img src="/images/icons/cut.svg" className='w-4' alt="Icon découpe des planches" />
                        </div>
                      </a>

                      <a
                          className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${tab !== 2 ? 'bg-white border-gray-200' : 'bg-gray-100 border-gray-200'}`}
                          href="#0"
                          onClick={(e) => { e.preventDefault(); setTab(2); }}
                      >
                        <div>
                          <div className="font-bold leading-snug tracking-tight mb-1 text-gray-900">Peinture</div>
                          <div className="text-gray-600">Selon votre choix, nous peignons les planches avec vos couleurs.</div>
                        </div>
                        <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                          <img src="/images/icons/paint.svg" className='w-4' alt="Icon peinture des planches" />
                        </div>
                      </a>

                      <a
                          className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${tab !== 3 ? 'bg-white border-gray-200' : 'bg-gray-100 border-gray-200'}`}
                          href="#0"
                          onClick={(e) => { e.preventDefault(); setTab(3); }}
                      >
                        <div>
                          <div className="font-bold leading-snug tracking-tight mb-1 text-gray-900">Livraison</div>
                          <div className="text-gray-600">Après le séchage nous envoyons vos planches et vous les recevez sous 5 à 7 jours</div>
                        </div>
                        <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                          <img src="/images/icons/shipping.svg" className='w-4' alt="Icon livraison des planches" />
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Tabs items */}
                  <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1" data-aos="zoom-y-out" ref={tabs}>
                      <div className="relative flex flex-col text-center lg:text-right">
                      {/* Item 1 */}
                      <Transition
                          show={tab === 1}
                          appear={true}
                          className="w-full"
                          enter="transition ease-in-out duration-700 transform order-first"
                          enterStart="opacity-0 translate-y-16"
                          enterEnd="opacity-100 translate-y-0"
                          leave="transition ease-in-out duration-300 transform absolute"
                          leaveStart="opacity-100 translate-y-0"
                          leaveEnd="opacity-0 -translate-y-16"
                      >
                          <div className="relative inline-flex flex-col">
                            <img className="md:max-w-none mx-auto rounded" src="/images/hero_image.jpg" width="500" height="462" alt="Features bg" />
                          </div>
                      </Transition>

                      {/* Item 2 */}
                      <Transition
                          show={tab === 2}
                          appear={true}
                          className="w-full"
                          enter="transition ease-in-out duration-700 transform order-first"
                          enterStart="opacity-0 translate-y-16"
                          enterEnd="opacity-100 translate-y-0"
                          leave="transition ease-in-out duration-300 transform absolute"
                          leaveStart="opacity-100 translate-y-0"
                          leaveEnd="opacity-0 -translate-y-16"
                      >
                          <div className="relative inline-flex flex-col">
                            <img className="md:max-w-none mx-auto rounded" src="/images/hero_image.jpg" width="500" height="462" alt="Features bg" />
                          </div>
                      </Transition>

                      {/* Item 3 */}
                      <Transition
                          show={tab === 3}
                          appear={true}
                          className="w-full"
                          enter="transition ease-in-out duration-700 transform order-first"
                          enterStart="opacity-0 translate-y-16"
                          enterEnd="opacity-100 translate-y-0"
                          leave="transition ease-in-out duration-300 transform absolute"
                          leaveStart="opacity-100 translate-y-0"
                          leaveEnd="opacity-0 -translate-y-16"
                      >
                          <div className="relative inline-flex flex-col">
                            <img className="md:max-w-none mx-auto rounded" src="/images/hero_image.jpg" width="500" height="462" alt="Features bg" />
                          </div>
                      </Transition>
                      </div>
                  </div>
                </div>
            </div>
          </div>
        </section>

        <Spacer h={5}/>
        <div className="mx-auto max-w-7xl md:px-0 px-10" data-aos="zoom-y-out" data-aos-delay="450">
          <ClientReview />
        </div>

        <Spacer h={10}/>
        <div data-aos="zoom-y-out" data-aos-delay="450">
          <Social />
        </div>
        <Spacer h={4}/>
      </div>
    </Layout>
  )
}
