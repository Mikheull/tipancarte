import { useContext, useEffect, useReducer } from "react"
import Link from 'next/link'
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import axios from "axios";
import Moment from 'react-moment';
import Layout from "../../../components/Layout";
import Sidebar from "../../../components/profile/Sidebar";
import { Store } from "../../../context/Store"
import { Table, Button, Text } from '@geist-ui/core'

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, orders: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            state;
    }
}

function OrdersHistory() {
    const { state } = useContext(Store)
    const { userInfo } = state;
    const router = useRouter()

    // This useReducer will fill after Fetch request action
    const [{ loading, error, orders }, dispatch] = useReducer(reducer, { loading: true, orders: [], error: '' })

    useEffect(() => {
        // Only authenticated user can access this page
        if (!userInfo) {
            router.push('/login?redirect=/profile/orders')
        }
        const fetchOrder = async () => {
            try {
                // orderId comes from Url-Params
                dispatch({ type: 'FETCH_REQUEST' }); // Loading: true, error: ''
                const { data } = await axios.get(`/api/orders/history`, {
                    headers: { authorization: `Bearer ${userInfo.token}` }
                })
                // Send received response as payload
                dispatch({ type: 'FETCH_SUCCESS', payload: data }) // Loading: false, error: '', orders: [{...}, {...}]
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error })
            }
        }
        fetchOrder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const data = orders.map(function(order){
        return { 
            id: order.nanoId, 
            date: <Moment format="DD/MM/YYYY">{order.createdAt}</Moment>, 
            total: `${order.totalPrice}€`,
            paid: order.isPaid ? <Moment format="[Payée le] DD/MM/YYYY à HH[h]mm">{order.paidAt}</Moment> : 'Non payée', 
            delivered: order.isDelivered ?  <Moment format="[Livré le] DD/MM/YYYY à HH[h]mm">{order.deliveredAt}</Moment> : 'Non livré', 
            action: (
                <Link href={`/profile/orders/${order.nanoId}`} passHref>
                    <Button>Details</Button>
                </Link>
            ) 
        }
    });

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
        <Layout title="Commandes" >
            <div className="py-6 mx-auto max-w-6xl md:px-4 px-10 min-h-screen flex flex-col">
                <Sidebar links={links} actual="orders" />

                <div className="my-6 overflow-scroll">
                    {loading ? (
                        <>
                            <Table>
                                <Table.Column prop="id" label="ID" />
                                <Table.Column prop="date" label="Date de commande" />
                                <Table.Column prop="total" label="Total" />
                                <Table.Column prop="paid" label="Payée" />
                                <Table.Column prop="delivered" label="Livrée" />
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
                                <Table.Column prop="id" label="ID" />
                                <Table.Column prop="date" label="Date de commande" />
                                <Table.Column prop="total" label="Total" />
                                <Table.Column prop="paid" label="Payée" />
                                <Table.Column prop="delivered" label="Livrée" />
                                <Table.Column prop="action" label="" />
                            </Table>
                        )}
                </div>

            </div>  
        </Layout >
    )
}

export default dynamic(() => Promise.resolve(OrdersHistory), { ssr: false })
