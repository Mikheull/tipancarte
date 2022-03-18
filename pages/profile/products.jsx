import { useContext, useEffect, useReducer } from "react"
import Link from 'next/link'
import Image from 'next/image'
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import axios from "axios";
import Layout from "../../components/Layout";
import { Store } from "../../context/Store"
import { Table, Button, Text } from '@geist-ui/core'

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


    const data = products.map(function(product){
        return { 
            id: product.nanoId, 
            name: (
                <div className="p-4" >
                    <Link href={`/preview/${product.nanoId}`}>
                        <a className="flex items-center text-black">
                            <Image src={product.image_preview} width="64" height="64" alt="Image du produit"/>
                            <span className="ml-2 font-bold">{product.name}</span>
                        </a>
                    </Link>
                </div>
            ),
            price: product.price + ' €', 
            action: (
                <Link href={`/preview/${product.nanoId}`} passHref>
                    <Button>Details</Button>
                </Link>
            ) 
        }
    });

    if(!userInfo) return false

    return (
        <Layout title="Mes favoris" >
            <div className="py-6 mx-auto max-w-6xl md:px-4 px-10 min-h-screen flex flex-col">
                <div className="border-b-2 border-gray-200">
                    <ul className="flex flex-wrap gap-x-6">
                        <li className="">
                            <Link href="/profile">
                                <a className="text-gray-600 font-normal">
                                    Profil
                                </a>
                            </Link>
                        </li>
                        <li className="">
                            <Link href="/profile/orders">
                                <a className="text-gray-600 font-normal">
                                    Commandes
                                </a>
                            </Link>
                        </li>
                        <li className="">
                            <Link href="/profile/products">
                                <a className="text-gray-800 font-bold">
                                    Pancartes
                                </a>
                            </Link>
                        </li>
                        <li className="">
                            <Link href="/profile/saved">
                                <a className="text-gray-600 font-normal">
                                    Sauvegardes
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>


                <div className="my-6 overflow-scroll">
                    {loading ? (
                        <>
                            <Table>
                                <Table.Column prop="name" label="Id" />
                                <Table.Column prop="price" label="Prix" />
                                <Table.Column prop="action" label="" />
                            </Table>
                            <div className="border rounded-md p-4 w-full mx-auto my-6">
                                <div className="animate-pulse flex space-x-4">
                                    <div className="flex-1 space-y-6 py-1">
                                        <div className="space-y-3">
                                            <div className="h-2 bg-slate-200 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                    : error ? (<Text>{error}</Text>)
                        : (
                            <Table data={data}>
                                <Table.Column prop="name" label="Id" />
                                <Table.Column prop="price" label="Prix" />
                                <Table.Column prop="action" label="" />
                            </Table>
                        )}
                </div>

            </div>  
        </Layout >
    )
}

export default dynamic(() => Promise.resolve(ProductHistory), { ssr: false })
