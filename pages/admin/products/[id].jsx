import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from 'next/link'
import dynamic from "next/dynamic"
import Moment from 'react-moment';
import axios from 'axios';
import dbConnect from "../../../utils/database";
import Product from '../../../models/Product';
import User from '../../../models/User';
import Order from '../../../models/Order';
import { Store } from "../../../context/Store";
import LayoutAdmin from "../../../components/LayoutAdmin";
import { Breadcrumbs, Text, Spacer, Divider, Button, useModal, Modal, useToasts, Table } from '@geist-ui/core'

function ProductItem({product, orders, loader}) {
    const { state } = useContext(Store)
    const { userInfo } = state;
    const [hasAccess, setHasAccess] = useState(false)
    const [loading, setLoading] = useState(true);
    const router = useRouter()
    const { setVisible, bindings } = useModal()
    const { setToast } = useToasts()

    useEffect(() => {
        if (loader === false) {
            setLoading(false)
        }
    }, [loader])

    useEffect(() => {
        const hasAccessible = async () => {
            try {
                if(userInfo.role && userInfo.role == 'admin'){
                    setHasAccess(true)
                }
            } catch (error) {
                // console.error(error)
            }
        }
        hasAccessible()

    }, [userInfo])


    const deleteProduct = async (id) => {
        try {
            const { data } = await axios.delete(`/api/products/delete/${id}`, {
                headers: { authorization: `Bearer ${userInfo.token}` }
            })

            if(data){
                router.push('/admin/products')
            }else{
                setToast({ text: 'Une erreur est survenue !', delay: 2000, type: "error"})
            }
           
        } catch (error) {
            setToast({ text: 'Une erreur est survenue !', delay: 2000, type: "error"})
        }
    }

    if(!hasAccess) {return 'Accès interdit !'}

    return (
        <LayoutAdmin title="Produits" actual="products">
            <div className="py-6 mx-auto max-w-6xl md:px-4 px-10 min-h-screen flex flex-col">
                <Breadcrumbs>
                    <Link href="/admin" passHref>
                        <Breadcrumbs.Item className="cursor-pointer">Admin</Breadcrumbs.Item>
                    </Link>
                    <Link href="/admin/products" passHref>
                        <Breadcrumbs.Item className="cursor-pointer">Produits</Breadcrumbs.Item>
                    </Link>
                </Breadcrumbs>

                <div className="my-6 overflow-scroll">
                    {loading ? (
                        <>
                           Loading
                        </>
                    )
                    : 
                    (
                        <>
                            <Text h3 className="font-bitter">Produit : {product.name}</Text>
                            <Text p>Crée le {<Moment format="DD/MM/YYYY à HH[h]mm">{product.createdAt}</Moment>} par {(product.user) ? product.user.name : 'Anonyme'}</Text>
                            <Spacer h={2} />
                            <div className="flex flex-col gap-2 w-full md:w-1/2">
                               

                                <Button className="mt-6" type="error" auto onClick={() => setVisible(true)}>Supprimer le produit</Button>
                                <Modal {...bindings}>
                                    <Modal.Title>Supprimer</Modal.Title>
                                    <Modal.Content>
                                        <p>Êtes vous sûr de vouloir supprimer ce produit ?</p>
                                    </Modal.Content>
                                    <Modal.Action passive onClick={() => setVisible(false)}>Annuler</Modal.Action>
                                    <Modal.Action onClick={() => deleteProduct(product._id)}>Confirmer</Modal.Action>
                                </Modal>
                            </div>
                            <Spacer h={5} />
                            <Divider />

                            <Text h4 className="font-bitter">Commandé ({orders.length})</Text>
                            <Table data={(
                                orders.map(function(order){
                                    return { 
                                        id: order._id, 
                                        nanoId: order.nanoId, 
                                        date: <Moment format="DD/MM/YYYY">{order.createdAt}</Moment>, 
                                        total: `${order.totalPrice}€`,
                                        paid: order.isPaid ? <Moment format="[Payée le] DD/MM/YYYY à HH[h]mm">{order.paidAt}</Moment> : 'Non payée', 
                                        delivered: order.isDelivered ?  <Moment format="[Livré le] DD/MM/YYYY à HH[h]mm">{order.deliveredAt}</Moment> : 'Non livré', 
                                        action: (
                                            <Link href={`/admin/orders/${order.nanoId}`} passHref>
                                                <Button>Details</Button>
                                            </Link>
                                        ) 
                                    }
                                })
                            )}>
                                <Table.Column prop="nanoId" label="ID" />
                                <Table.Column prop="date" label="Date de commande" />
                                <Table.Column prop="total" label="Total" />
                                <Table.Column prop="paid" label="Payée" />
                                <Table.Column prop="delivered" label="Livrée" />
                                <Table.Column prop="action" label="" />
                            </Table>
                        </>
                        
                    )}
                </div>

            </div>  
        </LayoutAdmin>
    )
}


export default dynamic(() => Promise.resolve(ProductItem), { ssr: false })

// Get data from server side before rendering page
export async function getServerSideProps({params}) {
    try {
        await dbConnect();
        const response_product = await Product.findOne({nanoId: params.id}).populate({path: 'user', model: User, select: 'name'});
        const product = JSON.parse(JSON.stringify(response_product))

        const orders_response = await Order.find({"orderItems.nanoId": params.id});
        const orders = JSON.parse(JSON.stringify(orders_response))

        return {
            props: {
                params, product, orders ,loader: false
            }
        }

    } catch (error) {
        return {
            props: {
                params, product: null, orders: null, error: "Something went wrong while fetching data"
            },
        }
    }
}
