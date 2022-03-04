import React from 'react';
import Head from 'next/head';
import Root from '../components/common/Root';
import Footer from '../components/common/Footer';
import SocialMedia from '../components/common/SocialMedia';
import HeroSection from '../components/homepage/HeroSection';
import HomeAbout from '../components/homepage/HomeAbout.js';
import ClientReview from '../components/productAssets/ClientReview';

const Home = () => (
  <Root transparentHeader={true}>
    <Head>
      <title>TiPancarte - Connecte toi</title>
    </Head>

    <HeroSection />
    <HomeAbout />
    <ClientReview />

    <SocialMedia />
    <Footer />
  </Root>
);

export default Home;
