import { useContext, useEffect, useReducer } from "react"
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useRouter } from "next/router";
import Moment from 'react-moment';
import axios from "axios";
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import Layout from "../../../components/Layout";
import { Store } from "../../../context/Store";

import {  Text, Card, Table, useToasts, Spacer, Tag } from '@geist-ui/core'

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, order: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        // Cases when pay is success
        case 'PAY_REQUEST':
            return { ...state, loadingPay: true, error: '' };
        case 'PAY_SUCCESS':
            return { ...state, loadingPay: false, successPay: true };
        case 'PAY_FAIL':
            return { ...state, loadingPay: false, errorPay: action.payload };
        case 'PAY_RESET':
            return { ...state, loadingPay: false, successPay: false, errorPay: '' };
        default:
            state;
    }
}

function Order({ params }) {
    const orderId = params.id // 'id' because is inside [] in this filename
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()
    const router = useRouter()
    const { state } = useContext(Store)
    const { userInfo } = state;
    const { setToast } = useToasts()

    // Supprimer pour réouvrir le paiement !
    const PaymentDisabled = true

    // This useReducer will fill after Fetch request action
    const [{ loading, error, order, successPay }, dispatch] = useReducer(reducer, { loading: true, order: {}, error: '' })
    // 'order' will fill after data-API request
    const { shippingAddress, orderItems, taxPrice, shippingPrice, totalPrice, isDelivered, isPaid, paidAt, deliveredAt } = order

    // FETCH REQUEST TO single order to fill data in useReducer Hook and use in JSX Section (orderId is the :nanoId from Url-Params, captured for getServerSideProps())
    useEffect(() => {
        if (!userInfo) {
            // push to /login because is not Authenticated User
            router.push(`/login?redirect=/profile/orders/${orderId}`)
        }
        const fetchOrder = async () => {
            try {
                // orderId comes from Url-Params
                dispatch({ type: 'FETCH_REQUEST' }); // Loader: true, error: ''
                const { data } = await axios.get(`/api/orders/${orderId}`, {
                    headers: { authorization: `Bearer ${userInfo.token}` }
                })

                if(data.user === userInfo._id){
                    dispatch({ type: 'FETCH_SUCCESS', payload: data }) // Loader: false, error: '', order: {...}
                }else{
                    router.push('/profile/orders')
                }
            } catch (error) {
                router.push('/profile/orders')
                dispatch({ type: 'FETCH_FAIL', payload: error })
            }
        }
        // console.log('Order received: ', order)
        if (!order.nanoId || successPay || (order.nanoId && order.nanoId !== orderId)) {
            // order.nanoId and orderId should be the same because we send the Url-params ID to the request-API 
            // So, the request search and returns the document with that ID
            fetchOrder()
            if (successPay) {
                dispatch({ type: 'PAY_RESET', payload: error })
            }
        } else {
            // At this point order Object is available with all its properties
            // PAYPAL INIT
            const loadPayPalScript = async () => {
                // GET PAYPAL_CLIENT_ID through Request for protect data  (env.local) then rename 'data' AS 'clientId'
                const { data: clientId } = await axios.get('/api/keys/paypal', {
                    headers: { authorization: `Bearer ${userInfo.token}` }
                })
                // SET CLIENT ID & CURRENCY FOR PAYPAL
                paypalDispatch({
                    type: 'resetOptions', value: {
                        'client-id': clientId,
                        currency: 'USD',
                    }
                })
                // LOAD PAYPAL SCRIPT FROM PAYPAL WEBSITE
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
            }
            loadPayPalScript()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [order, successPay])

    // CALL ACTIONS FROM PAYPAL TO CREATE THE ORDER (Only set the totalPrice to pay)
    function createOrder(data, actions) {
        // create() return a Promise
        return actions.order.create({ purchase_units: [{ amount: { value: totalPrice } }] })
            // This orderID is the order generated by PayPal
            .then((orderID) => { return orderID })
    }
    // APROVE FUNCTION (PAYPAL) AT THIS POINT 'ispaid' property for 'order' Object needs to change to true, so make an put request to modify it.
    function onApprove(data, actions) {
        // Need to update status pay in database ('ispaid')
        return actions.order.capture().then(async function (details) {
            try {
                // At this point pay request is waiting to UPDATE the database to 'ispaid' to TRUE
                dispatch({ type: 'PAY_REQUEST' })
                const { data } = await axios.put(`/api/orders/${order.nanoId}/pay`,
                    details,
                    {
                        headers: { authorization: `Bearer ${userInfo.token}` }
                    })
                // Get back the same Object Order but updated with 'ispaid' to TRUE
                dispatch({ type: 'PAY_SUCCESS', payload: data })
                setToast({ text: 'Paiement réussi', delay: 2000, placement: 'topRight', type: 'success' })
            } catch (error) {
                dispatch({ type: 'PAY_FAIL', payload: error })
                setToast({ text: 'Paiement non complété', delay: 2000, placement: 'topRight', type: 'error' })
            }
        })
    }
    // THIS FUNCTION APPENDS AN ERROR WHEN OCURRS IN PAYPAL PAYMENT
    function onError() {
        setToast({ text: 'Paiement non complété', delay: 2000, placement: 'topRight', type: 'error' })
    }

    if(!userInfo) return false

    return (
        <Layout title={`Commande ${orderId}`} >
            <div className="py-6 mx-auto max-w-6xl md:px-4 px-10 min-h-screen flex flex-col">
                <Text h3 className="font-bitter">Commande : {orderId}</Text>
                <Spacer h={2} />

                <div className="flex md:flex-row flex-col">
                    {loading ? (
                        <>
                            <div className="md:w-7/12 w-full mb-6">
                                <Table>
                                    <Table.Column width={50} prop="name" label="Produit" />
                                    <Table.Column width={20} prop="price" label="Prix" />
                                </Table>

                                <div className="border rounded-md p-4 w-full mx-auto my-6">
                                    <div className="animate-pulse flex space-x-4">
                                        <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                                        <div className="flex-1 space-y-6 py-1">
                                        <div className="h-2 bg-slate-200 rounded"></div>
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-3 gap-4">
                                            <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                            </div>
                                            <div className="h-2 bg-slate-200 rounded"></div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-1/12 w-0"></div>
                            <div className="md:w-4/12 w-full">
                                <div className="border rounded-md p-4 w-full mx-auto my-6">
                                    <div className="animate-pulse flex space-x-4">
                                        <div className="flex-1 space-y-6 py-1 gap-y-2">
                                            <div className="h-64 w-full bg-slate-100"></div>
                                            <div className="h-64 w-full bg-slate-100"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                    : error ? (<Text>{error}</Text>)
                    : (
                        <>
                            <div className="md:w-7/12 w-full mb-6 overflow-scroll">
                                <Table data={
                                    orderItems.map(function(item){
                                        return { 
                                            id: item.nanoId, 
                                            name: (
                                                <div className="p-4" >
                                                    <Link href={`/preview/${item.nanoId}`}>
                                                        <a className="flex items-center text-black">
                                                            <Image src={item.image_preview} width="64" height="64" alt="Image du produit"/>
                                                            <span className="ml-2 font-bold">{item.name}</span>
                                                        </a>
                                                    </Link>
                                                </div>
                                            ),
                                            price: item.price+' €', 
                                        }
                                    })
                                }>
                                    <Table.Column width={50} prop="name" label="Produit" />
                                    <Table.Column width={20} prop="price" label="Prix" />
                                </Table>

                                <Spacer h={2} />

                                <div className="flex flex-col my-4 font-bitter">
                                    <div className="flex justify-between">
                                        <Text h4>Sous-total</Text>
                                        <Text h4 className="font-bold">{orderItems.reduce((a, c) => a + c.price, 0)}€</Text>
                                    </div>
                                    <div className="flex justify-between">
                                        <Text h4>Frais</Text>
                                        <Text h4 className="font-bold">{taxPrice}€</Text>
                                    </div>
                                    <div className="flex justify-between">
                                        <Text h4>Livraison</Text>
                                        <Text h4 className="font-bold">{shippingPrice}€</Text>
                                    </div>
                                    <div className="flex justify-between">
                                        <Text h4>Total</Text>
                                        <Text h4 className="font-bold">{totalPrice}€</Text>
                                    </div>
                                </div>
                            </div>

                            <div className="md:w-1/12 w-0"></div>
                            
                            <div className="md:w-4/12 w-full">
                                <div className="bg-gray-50 px-8 py-6">
                                    <Text h4 className="font-bitter">Adresse de livraison</Text>
                                    <Card>
                                        <Text>{shippingAddress.fullName}</Text>
                                        <Text>{shippingAddress.address}</Text>
                                        <Text>{shippingAddress.city}</Text>
                                        <Text>{shippingAddress.postalCode}</Text>
                                        <Text>{shippingAddress.country}</Text>
                                        <Card.Footer>
                                            <Text>Status: <Tag>{isDelivered ? <Moment format="[Livré le] DD/MM/YYYY à HH[h]mm">{deliveredAt}</Moment> : 'Non livré'}</Tag></Text>
                                        </Card.Footer>
                                    </Card>

                                    <Spacer h={2} />

                                    <Text h4 className="font-bitter">Méthode de paiement</Text>
                                    <Card>
                                        <Text>
                                            {!isPaid && (
                                                <div>
                                                    {isPending ? (
                                                        <div className="border rounded-md p-4 w-full mx-auto my-6">
                                                            <div className="animate-pulse flex space-x-4">
                                                                <div className="flex-1 space-y-6 py-1">
                                                                    <div className="space-y-3">
                                                                        <div className="h-2 bg-slate-200 rounded"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) :
                                                        (
                                                            <div className="text-red-500">
                                                                {PaymentDisabled ? 'Paiement suspendu pour le moment' : (
                                                                    <PayPalButtons
                                                                        createOrder={createOrder}
                                                                        onApprove={onApprove}
                                                                        onError={onError}>
                                                                    </PayPalButtons>
                                                                )}
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            )}
                                            {isPaid && (
                                                <Text>Status: <Tag>{isPaid ? <Moment format="[Payé le] DD/MM/YYYY à HH[h]mm">{paidAt}</Moment> : 'Non payé'}</Tag></Text>
                                            )}
                                        </Text>
                                        {!isPaid && (
                                            <Card.Footer>
                                                <Text>Status: <Tag>{isPaid ? <Moment format="[Payé le] DD/MM/YYYY à HH[h]mm">{paidAt}</Moment> : 'Non payé'}</Tag></Text>
                                            </Card.Footer>
                                        )}
                                    </Card>

                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Layout >
    )
}
// READ URL-PARAMS TO GET :id and send it to fronted side
// THIS FUNCTION RUNS ON SERVER SIDE, Params refers to Url-params (In this case :id fileName)
export async function getServerSideProps({ params }) {
    return { props: { params } }
}
export default dynamic(() => Promise.resolve(Order), { ssr: false })