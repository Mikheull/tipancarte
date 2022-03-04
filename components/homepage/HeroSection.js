import React from 'react';
import { Autoplay, EffectFade, Swiper as SwiperCore } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';

const params = {
  slidesPerView: 1,
  watchOverflow: false,
  autoplay: {
    delay: 5000
  },
  loop: true,
  allowTouchMove: false,
  speed: 1000,
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  }
};
const image = '/images/martinique-MQ.jpg'

export default function HeroSection() {
  SwiperCore.use([Autoplay, EffectFade]);
  return (
    <div className="hero-section position-relative">
      <Swiper {...params}>
          <SwiperSlide>
            <div className="hero-slide d-flex py-5 bg-home-orange-300">
              <div className='col-0 col-lg-6 col-sm-4 d-flex justify-content-center'>
                <img src="home/tipancarte__banner.svg" className="w-64 tipancarte_banner" alt="Image de bannière"/>
              </div>
              <div className='col-12 col-lg-6 col-sm-8 d-flex justify-content-center flex-column'>
                <h2 className='font-size-display5 font-weight-bold font-color-home-orange'>Spécial Martinique</h2>
                <p className='font-size-subheader mt-6 pr-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida ac tellus id porttitor. Nunc sollicitudin fringilla ante sit amet fermentum. Fusce viverra ex non leo tincidunt, id luctus arcu cursus. Donec vulputate quam nisl. Phasellus sodales pretium lectus, eget ullamcorper dolor sodales eget</p>
                <div className="d-flex align-items-center mt-6">
                  <Link href="/product/3AVWoo">
                    <a className="h-56 bg-home-orange-900 font-color-white pl-3 pr-4 d-flex align-items-center">
                      Créer
                    </a>
                  </Link>

                  <p className='ml-2 font-size-title font-weight-bold font-color-home-orange'>5€ <span className='font-size-tiny'>/planche</span></p>
                </div>
              </div>
            </div>

            <div className="hero-slide-bottom d-flex py-5 bg-home-orange-100">
              <div className='col-0 col-lg-6'></div>
              <div className='col-12 col-lg-6 d-flex'>
                <div className='col-4'>
                  <p className='font-size-title font-weight-bold font-color-home-orange'>Fabrication</p>
                  <p className='font-size-paragraph'>Manuelle</p>
                </div>
                <div className='col-4'>
                  <p className='font-size-title font-weight-bold font-color-home-orange'>Peronnalisable</p>
                  <p className='font-size-paragraph'>100%</p>
                </div>
                <div className='col-4'>
                  <p className='font-size-title font-weight-bold font-color-home-orange'>Couleurs</p>
                  <p className='font-size-paragraph'>+20</p>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="hero-slide d-flex py-5 bg-home-green-300">
              <div className='col-0 col-lg-6 col-sm-4 d-flex justify-content-center'>
                <img src="home/tipancarte__banner.svg" className="w-64 tipancarte_banner" alt="Image de bannière"/>
              </div>
              <div className='col-12 col-lg-6 col-sm-8 d-flex justify-content-center flex-column'>
                <h2 className='font-size-display5 font-weight-bold font-color-home-green'>Spécial Martinique</h2>
                <p className='font-size-subheader mt-6 pr-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida ac tellus id porttitor. Nunc sollicitudin fringilla ante sit amet fermentum. Fusce viverra ex non leo tincidunt, id luctus arcu cursus. Donec vulputate quam nisl. Phasellus sodales pretium lectus, eget ullamcorper dolor sodales eget</p>
                <div className="d-flex align-items-center mt-6">
                  <Link href="/product/3AVWoo">
                    <a className="h-56 bg-home-green-900 font-color-white pl-3 pr-4 d-flex align-items-center">
                      Créer
                    </a>
                  </Link>

                  <p className='ml-2 font-size-title font-weight-bold font-color-home-green'>5€ <span className='font-size-tiny'>/planche</span></p>
                </div>
              </div>
            </div>

            <div className="hero-slide-bottom d-flex py-5 bg-home-green-100">
              <div className='col-0 col-lg-6'></div>
              <div className='col-12 col-lg-6 d-flex'>
                <div className='col-4'>
                  <p className='font-size-title font-weight-bold font-color-home-green'>Fabrication</p>
                  <p className='font-size-paragraph'>Manuelle</p>
                </div>
                <div className='col-4'>
                  <p className='font-size-title font-weight-bold font-color-home-green'>Peronnalisable</p>
                  <p className='font-size-paragraph'>100%</p>
                </div>
                <div className='col-4'>
                  <p className='font-size-title font-weight-bold font-color-home-green'>Couleurs</p>
                  <p className='font-size-paragraph'>+20</p>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="hero-slide d-flex py-5 bg-home-red-300">
              <div className='col-0 col-lg-6 col-sm-4 d-flex justify-content-center'>
                <img src="home/tipancarte__banner.svg" className="w-64 tipancarte_banner" alt="Image de bannière"/>
              </div>
              <div className='col-12 col-lg-6 col-sm-8 d-flex justify-content-center flex-column'>
                <h2 className='font-size-display5 font-weight-bold font-color-home-red'>Spécial Martinique</h2>
                <p className='font-size-subheader mt-6 pr-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida ac tellus id porttitor. Nunc sollicitudin fringilla ante sit amet fermentum. Fusce viverra ex non leo tincidunt, id luctus arcu cursus. Donec vulputate quam nisl. Phasellus sodales pretium lectus, eget ullamcorper dolor sodales eget</p>
                <div className="d-flex align-items-center mt-6">
                  <Link href="/product/3AVWoo">
                    <a className="h-56 bg-home-red-900 font-color-white pl-3 pr-4 d-flex align-items-center">
                      Créer
                    </a>
                  </Link>

                  <p className='ml-2 font-size-title font-weight-bold font-color-home-red'>5€ <span className='font-size-tiny'>/planche</span></p>
                </div>
              </div>
            </div>

            <div className="hero-slide-bottom d-flex py-5 bg-home-red-100">
              <div className='col-0 col-lg-6'></div>
              <div className='col-12 col-lg-6 d-flex'>
                <div className='col-4'>
                  <p className='font-size-title font-weight-bold font-color-home-red'>Fabrication</p>
                  <p className='font-size-paragraph'>Manuelle</p>
                </div>
                <div className='col-4'>
                  <p className='font-size-title font-weight-bold font-color-home-red'>Peronnalisable</p>
                  <p className='font-size-paragraph'>100%</p>
                </div>
                <div className='col-4'>
                  <p className='font-size-title font-weight-bold font-color-home-red'>Couleurs</p>
                  <p className='font-size-paragraph'>+20</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
      </Swiper>
    </div>
  );
}
