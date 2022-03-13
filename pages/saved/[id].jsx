import { useEffect, useReducer, useState, useContext } from "react"
import dynamic from 'next/dynamic'
import { useRouter } from "next/router";
import axios from "axios";
import Layout from '../../components/Layout'
import ProductDetails from '../../components/shop/ProductDetails.jsx'
import ProductImages from '../../components/shop/ProductImages.jsx'
import ClientReview from '../../components/shop/ClientReview.jsx'
import ProductConfiguration from '../../components/shop/ProductConfiguration.jsx'
import Social from '../../components/shop/Social.jsx'
import {Spacer } from '@geist-ui/core'
import { Store } from "../../context/Store";

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

function SavedProduct({ params }) {
    const productId = params.id
    const router = useRouter()
    const { state } = useContext(Store)
    const { userInfo } = state;
    const [loadedProduct, setLoadedProduct] = useState(false)
    const [{ product }, dispatch] = useReducer(reducer, { loading: true, product: {}, error: '' })

    useEffect(() => {
        if (!userInfo) {
            router.push('/')
        }

        const fetchProduct = async () => {
            try {
                // productId comes from Url-Params
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/products_saved/${productId}`)
                if(data.user === userInfo._id){
                    dispatch({ type: 'FETCH_SUCCESS', payload: data })
                }else{
                    router.push('/')
                }
                
                setLoadedProduct(false)
            } catch (error) {
                router.push('/')
            }
        }

        fetchProduct()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product && !loadedProduct])

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
    const productDetails = {
        name: product.name,
        image_preview: product.image_preview,
        description: 'Dans un style martiniquais, configurez votre propre pancarte en ajoutant jusqu\'à 6 planches totalement personnalisable !<br /> Modifiez les couleurs, les textes et la direction de la flèche.<br /> Laissez libre cours à votre immagination ou choisissez parmis un de nos modèles.',
        soldOut: false,
    }

    return (
        <Layout title={`Sauvegarde de ${product.name}`} actual="shop" og_image={productDetails.image_preview} og_image_width="540" og_image_height="720">
            <div className="py-6 mx-auto max-w-7xl md:px-4 px-10 flex flex-col lg:flex-row" data-aos="zoom-y-out" data-aos-delay="250">
                <div className="w-full lg:w-1/2 px-0 md:px-6">
                    <ProductImages images={productImage}/>
                </div>
                <div className="w-full lg:w-1/2 mt-4 md:mt-0">
                    <ProductDetails product={productDetails} savedMode/>
                </div>
            </div>
                
            <Spacer h={6} />
            <div className="py-6 mx-auto max-w-7xl md:px-4 px-10 flex flex-col" data-aos="zoom-y-out" data-aos-delay="250">
                <ProductConfiguration product={product} savedMode/>
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
export default dynamic(() => Promise.resolve(SavedProduct), { ssr: false })