import React from 'react';
import Head from 'next/head';
import Root from '../components/common/Root';
import ExploreBanner from '../components/productAssets/ExploreBanner';
import Shop from '../components/shop/Shop';
import SocialMedia from '../components/common/SocialMedia';
import Footer from '../components/common/Footer';

const Home = () => (
  <Root>
    <Head>
      <title>Boutique</title>
    </Head>
    {/* <Shop /> */}
    <ExploreBanner />
    <SocialMedia />
    <Footer />
  </Root>
);

export default Home;
