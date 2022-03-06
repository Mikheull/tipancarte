import { Autoplay, EffectFade, Swiper as SwiperCore } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Text, Spacer, Link } from '@geist-ui/core'
import ClientReview from '../components/shop/ClientReview.jsx'
import Social from '../components/shop/Social.jsx'

import Layout from '../components/Layout'

export default function Home() {
  SwiperCore.use([Autoplay, EffectFade]);
  const params = {
    slidesPerView: 1,
    watchOverflow: false,
    // loop: true,
    allowTouchMove: false,
    speed: 1000,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    }
  };

  const homeSlider = {
    height: "90vh"
  };

  return (
    <Layout>
      <Swiper {...params}>
        <SwiperSlide className='flex flex-col' style={homeSlider}>
          <div className='bg-violet-200 w-screen md:h-4/5 h-2/3 flex items-center'>
            <div className='md:w-1/3 lg:w-1/2 w-full md:flex hidden justify-center'>
              <img src="/images/home/tipancarte__banner.svg" className="md:w-3/12 xl:w-2/12 md:flex hidden absolute bottom-10" alt="Image de bannière"/>
            </div>

            <div className='md:w-2/3 lg:w-1/2 w-full flex flex-col px-10'>
              <Text h2 className='font-bold text-4xl'><span className='text-violet-800'>Spécial Martinique</span></Text>
              <Text p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida ac tellus id porttitor. Nunc sollicitudin fringilla ante sit amet fermentum. Fusce viverra ex non leo tincidunt, id luctus arcu cursus. Donec vulputate quam nisl. Phasellus sodales pretium lectus, eget ullamcorper dolor sodales eget</Text>
              
              <div className="flex items-center mt-6">
                <Link href="/shop">
                  <a className="px-4 py-2 text-2xl bg-violet-500 text-violet-100">
                    Créer
                  </a>
                </Link>

                <div small className='font-bold ml-4 text-2xl'>5€ <span className='text-xs'>/planche</span></div>
              </div>
            </div>
          </div>

          <div className='bg-violet-100 w-screen md:h-1/5 h-1/3 flex items-center'>
            <div className='md:w-1/3 lg:w-1/2 w-full flex justify-center'>
              <img src="/images/home/tipancarte__banner.svg" className="h-48 flex md:hidden" alt="Image de bannière"/>
            </div>

            <div className='md:w-2/3 lg:w-1/2 w-full flex flex-col md:flex-row'>
              <div className='w-1/3'>
                <h4 className='font-bold text-xl text-violet-800'>Fabrication</h4>
                <span className='text-sm font-semibold'>Manuelle</span>
              </div>
              <div className='w-1/3'>
                <h4 className='font-bold text-xl text-violet-800'>Peronnalisable</h4>
                <span className='text-sm font-semibold'>100%</span>
              </div>
              <div className='w-1/3'>
                <h4 className='font-bold text-xl text-violet-800'>Couleurs</h4>
                <span className='text-sm font-semibold'>+20</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      
      <Spacer h={4}/>
      <div className="mx-auto max-w-7xl md:px-0 px-10">
        <div className='my-4 text-center'>
          <Text h2>A propos de nous</Text>
          <div className='w-full md:w-2/3 mx-auto'>
            <Text p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida ac tellus id porttitor. Nunc sollicitudin fringilla ante sit amet fermentum. Fusce viverra ex non leo tincidunt, id luctus arcu cursus. Donec vulputate quam nisl. Phasellus sodales pretium lectus, eget ullamcorper dolor sodales eget</Text>
          </div>
        </div>
      </div>

      <Spacer h={5}/>
      <div className="mx-auto max-w-7xl md:px-0 px-10">
        <ClientReview />
      </div>

      <Spacer h={10}/>
      <Social />
      <Spacer h={4}/>
    </Layout>
  )
}
