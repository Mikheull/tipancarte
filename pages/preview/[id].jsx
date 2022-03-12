import { useEffect, useReducer } from "react"
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from "next/router";
import axios from "axios";
import Layout from '../../components/Layout'
import ProductDetails from '../../components/shop/ProductDetails.jsx'
import ClientReview from '../../components/shop/ClientReview.jsx'
import ProductPreview from '../../components/shop/ProductPreview.jsx'
import Social from '../../components/shop/Social.jsx'

import { Spacer } from '@geist-ui/core'

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, product: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            state;
    }
}

function Preview({ params }) {
    const productId = params.id
    const router = useRouter()
    const [{ product }, dispatch] = useReducer(reducer, { loading: true, product: {}, error: '' })

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // productId comes from Url-Params
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/products/${productId}`)
                if(!data){router.push('/')}
                
                // Send received response as payload
                dispatch({ type: 'FETCH_SUCCESS', payload: data })
            } catch (error) {
                router.push('/')
                // dispatch({ type: 'FETCH_FAIL', payload: error })
            }
        }

        fetchProduct()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product])

    const productDetails = {
        name: product.name,
        image_preview: product.image_preview,
        description: 'Dans un style martiniquais, configurez votre propre pancarte en ajoutant jusqu\'à 6 planches totalement personnalisable !<br /> Modifiez les couleurs, les textes et la direction de la flèche.<br /> Laissez libre cours à votre immagination ou choisissez parmis un de nos modèles.',
        soldOut: false,
    }

    return (
        <Layout title={`Previsualisation de ${product.name}`} description="Prenez inspiration dans cette pancarte créé par un de nos utilisateurs et ajoutez la dans votre panier pour passer commande." actual="shop" og_image={productDetails.image_preview} og_image_width="540" og_image_height="720">
            <div className="py-6 mx-auto max-w-7xl md:px-4 px-10 flex flex-col lg:flex-row" data-aos="zoom-y-out" data-aos-delay="250">
                <div className="w-full lg:w-1/2 px-0 md:px-6">
                    <div>
                        {productDetails.image_preview && <Image src={productDetails.image_preview} alt="Image du produit" width="100%" height="100%" layout="responsive" objectFit="contain"  className="w-full"/>}
                    </div>
                </div>
                <div className="w-full lg:w-1/2 mt-4 md:mt-0">
                    <ProductDetails product={productDetails} previewMode={true} />
                </div>
            </div>
                
            <Spacer h={6} />
            <div className="py-6 mx-auto max-w-7xl md:px-4 px-10 flex flex-col" data-aos="zoom-y-out" data-aos-delay="250">
                <ProductPreview product={product}/>
                <Spacer h={4} />
                <ClientReview />
                <Spacer h={2} />
            </div>

            <Spacer h={4}/>
                <div data-aos="zoom-y-out" data-aos-delay="450">
                    <Social />
                </div>
            <Spacer h={4}/>
        </Layout >
    )
}

export async function getServerSideProps({ params }) {
    return { props: { params } }
}
export default dynamic(() => Promise.resolve(Preview), { ssr: false })