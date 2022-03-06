import Layout from '../components/Layout'
import ProductImages from '../components/shop/ProductImages.jsx'
import ProductDetails from '../components/shop/ProductDetails.jsx'
import ClientReview from '../components/shop/ClientReview.jsx'
import ProductConfiguration from '../components/shop/ProductConfiguration.jsx'

export default function Shop() {
  const productImage = [
    {
        image: '/images/shop/tipancarte/48FF448F-2010-4FFA-A6C3-7B2F4A4CDEBD_1_105_c.jpg',
    },
    // {
    //     image: '/images/shop/tipancarte/1.jpg',
    // },
    // {
    //     image: '/images/shop/tipancarte/2.jpg',
    // },
    // {
    //     image: '/images/shop/tipancarte/3.jpg',
    // },
    // {
    //     image: '/images/shop/tipancarte/4.jpg',
    // }
  ];
  const product = {
    name: 'Pancarte personnalisé',
    description: 'Créez votre propre pancarte en ajoutant jusqu\'à 6 planches totalement personnalisable ! Modifiez les couleurs, les textes et la direction de la flèche.',
    soldOut: false,
  }

  return (
    <Layout title="Boutique">
      <div className="flex my-6 mx-auto md:max-w-7xl max-w-sm flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 px-0 md:px-6">
          <ProductImages images={productImage}/>
        </div>
        <div className="w-full lg:w-1/2 mt-4 md:mt-0">
          <ProductDetails product={product}/>
        </div>
      </div>
        
      <div className="mx-auto md:max-w-7xl max-w-sm my-24">
        <ProductConfiguration product={product}/>

        <div className="mt-10">
          <ClientReview />
        </div>
      </div>

    </Layout>
  )
}