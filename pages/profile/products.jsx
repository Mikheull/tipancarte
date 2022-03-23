import { useContext, useEffect, useReducer } from "react"
import Link from 'next/link'
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import axios from "axios";
import Layout from "../../components/Layout";
import Topbar from "../../components/profile/Topbar";
import { Store } from "../../context/Store"
import { Text } from '@geist-ui/core'
import { ArrowRight } from 'react-feather';

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, products: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            state;
    }
}

function ProductHistory() {
    const { state } = useContext(Store)
    const { userInfo } = state;
    const router = useRouter()

    // This useReducer will fill after Fetch request action
    const [{ loading, error, products }, dispatch] = useReducer(reducer, { loading: true, products: [], error: '' })

    useEffect(() => {
        // Only authenticated user can access this page
        if (!userInfo) {
            router.push('/login?redirect=/profile/products')
        }
        const fetchOrder = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' }); // Loading: true, error: ''
                const { data } = await axios.get(`/api/products/history`, {
                    headers: { authorization: `Bearer ${userInfo.token}` }
                })
                // Send received response as payload
                dispatch({ type: 'FETCH_SUCCESS', payload: data }) // Loading: false, error: '', products: [{...}, {...}]
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error })
            }
        }
        fetchOrder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const links = [
        {
            key: 'index',
            name: 'Profil',
            link: '/profile'
        },
        {
            key: 'orders',
            name: 'Commandes',
            link: '/profile/orders'
        },
        {
            key: 'products',
            name: 'Pancartes',
            link: '/profile/products'
        },
        {
            key: 'saved',
            name: 'Sauvegardes',
            link: '/profile/saved'
        }
    ];

    if(!userInfo) return false

    return (
        <Layout title="Mes favoris" >
            <Topbar links={links} actual="products" />
            <div className="py-6 mx-auto max-w-6xl md:px-4 px-10 min-h-screen flex flex-col">
                <Text h2 className="font-bitter font-extrabold">Mes pancartes</Text>
  
                {loading ? 
                    (
                        <>
                           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                <div className="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col md:flex-row relative group" >
                                    <div className="w-full h-96 bg-slate-100 animate-pulse"></div>
                                </div>
                                <div className="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col md:flex-row relative group" >
                                    <div className="w-full h-96 bg-slate-100 animate-pulse"></div>
                                </div>
                                <div className="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col md:flex-row relative group" >
                                    <div className="w-full h-96 bg-slate-100 animate-pulse"></div>
                                </div>
                            </div>
                        </>
                    )
                    : error ? (<Text>{error}</Text>)
                        : (

                            (products.length == 0) ? (
                                <div className="w-full text-center my-10">
                                    <img src="/images/states/no_products.svg" alt="Visuel représentant un contenu vide" className="md:w-2/6 w-full mx-auto mb-8" />
                                    <Link href="/shop" passHref><a style={{ cursor: 'pointer' }} className="text-orange-400 font-bold underline">Créez votre première pancarte ici</a></Link>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {
                                        products.map(function(product){
                                            return (
                                                <Link href={`/preview/${product.nanoId}`} key={product.nanoId}>
                                                    <a>
                                                        <div className="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col md:flex-row relative group" >
                                                            <div className="w-full h-full">
                                                                <img className="object-center object-cover w-full h-full" src={product.image_preview} alt="Visuel représentant un contenu vide" />
                                                            </div>
                                                            <div className="absolute bottom-0 bg-gray-800 w-full h-16 md:hidden flex items-center justify-center group-hover:flex">
                                                                <span className="ml-2 font-bold text-xl truncate text-white flex items-center gap-3">{product.name} <ArrowRight size={14} strokeWidth="3" className="mr-2" /></span>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </Link>
                                            )
                                        })
                                    }
                                </div>
                            )
                        
                    )
                }
            </div>  
        </Layout >
    )
}

export default dynamic(() => Promise.resolve(ProductHistory), { ssr: false })
