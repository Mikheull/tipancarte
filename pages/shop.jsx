import Layout from '../components/Layout'
import ProductImages from '../components/shop/ProductImages.jsx'
import ProductDetails from '../components/shop/ProductDetails.jsx'
import ClientReview from '../components/shop/ClientReview.jsx'
import ProductConfiguration from '../components/shop/ProductConfiguration.jsx'
import Social from '../components/shop/Social.jsx'
import {Spacer } from '@geist-ui/core'

export default function Shop() {
  const productImage = [
    {
      image: 'https://tipancarte.s3.eu-west-3.amazonaws.com/files/product_image_1.jpeg',
    }
  ];
  const product = {
    name: 'Pancarte personnalisée',
    description: 'Dans un style martiniquais, configurez votre propre pancarte en ajoutant jusqu\'à 6 planches totalement personnalisable !<br /> Modifiez les couleurs, les textes et la direction de la flèche.<br /> Laissez libre cours à votre immagination ou choisissez parmis un de nos modèles.',
    soldOut: false,
  }

  return (
    <Layout title="Boutique" actual="shop">
      <div className="py-6 mx-auto max-w-7xl md:px-4 px-10 flex flex-col lg:flex-row" data-aos="zoom-y-out" data-aos-delay="250">
        <div className="w-full lg:w-1/2 px-0 md:px-6">
          <ProductImages images={productImage}/>
        </div>
        <div className="w-full lg:w-1/2 mt-4 md:mt-0">
          <ProductDetails product={product}/>
        </div>
      </div>
        
      <Spacer h={6} />
      <ProductConfiguration product={product}/>

      <div className="py-6 mx-auto max-w-7xl md:px-4 px-10 flex flex-col" data-aos="zoom-y-out" data-aos-delay="250">
        <Spacer h={4} />
        <ClientReview />
        <Spacer h={2} />
      </div>

      <Spacer h={4}/>
          <div data-aos="zoom-y-out" data-aos-delay="450">
              <Social />
          </div>
      <Spacer h={4}/>

    </Layout>
  )
}