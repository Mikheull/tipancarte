import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from 'next/link'
import Image from 'next/image'
import dynamic from "next/dynamic"
import Moment from 'react-moment';
import axios from 'axios';
import dbConnect from "../../../utils/database";
import User from '../../../models/User';
import Product from '../../../models/Product';
import Order from '../../../models/Order';
import { Store } from "../../../context/Store";
import LayoutAdmin from "../../../components/LayoutAdmin";
import { Breadcrumbs, Input, Text, Spacer, Divider, Button, useModal, Modal, useToasts, Table } from '@geist-ui/core'

function UserItem({user, products, orders, loader}) {
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


    const deleteCustomer = async (id) => {
        try {
            const { data } = await axios.delete(`/api/users/delete/${id}`, {
                headers: { authorization: `Bearer ${userInfo.token}` }
            })

            if(data){
                router.push('/admin/users')
            }else{
                setToast({ text: 'Une erreur est survenue !', delay: 2000, type: "error"})
            }
           
        } catch (error) {
            setToast({ text: 'Une erreur est survenue !', delay: 2000, type: "error"})
        }
    }

    if(!hasAccess) {return 'Accès interdit !'}

    return (
        <LayoutAdmin title="Utilisateurs" actual="users">
            <div className="py-6 mx-auto max-w-6xl md:px-4 px-10 min-h-screen flex flex-col">
                <Breadcrumbs>
                    <Link href="/admin" passHref>
                        <Breadcrumbs.Item className="cursor-pointer">Admin</Breadcrumbs.Item>
                    </Link>
                    <Link href="/admin/users" passHref>
                        <Breadcrumbs.Item className="cursor-pointer">Utilisateurs</Breadcrumbs.Item>
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
                            <Text h3 className="font-bitter">Utilisateur : {user.name}</Text>
                            <Spacer h={2} />
                            <div className="flex flex-col gap-2 w-full md:w-1/2">
                                <Input width="100%" initialValue={user.name} readOnly>Nom</Input>
                                <Input width="100%" initialValue={user.email} readOnly>Email</Input>
                                <Input width="100%" initialValue={user.role} readOnly>Role</Input>

                                <Button className="mt-6" type="error" auto onClick={() => setVisible(true)}>Supprimer le compte</Button>
                                <Modal {...bindings}>
                                    <Modal.Title>Supprimer</Modal.Title>
                                    <Modal.Content>
                                        <p>Êtes vous sûr de vouloir supprimer ce compte ?</p>
                                    </Modal.Content>
                                    <Modal.Action passive onClick={() => setVisible(false)}>Annuler</Modal.Action>
                                    <Modal.Action onClick={() => deleteCustomer(user._id)}>Confirmer</Modal.Action>
                                </Modal>
                            </div>
                            <Spacer h={5} />
                            <Divider />
                            <Spacer h={2} />

                            <Text h4 className="font-bitter">Ses produits ({products.length})</Text>
                            <Table data={(
                                products.map(function(product){
                                    return { 
                                        id: product._id, 
                                        nanoId: product.nanoId, 
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
                                        price: product.price+' €',
                                        createdAt: <Moment format="DD/MM/YYYY">{product.createdAt}</Moment>, 
                                        action: (
                                            <Link href={`/admin/products/${product.nanoId}`} passHref>
                                                <Button>Details</Button>
                                            </Link>
                                        ) 
                                    }
                                })
                            )}>
                                <Table.Column prop="nanoId" label="Id" />
                                <Table.Column prop="name" label="Nom" />
                                <Table.Column prop="price" label="prix" />
                                <Table.Column prop="createdAt" label="Crée le" />
                                <Table.Column prop="action" label="" />
                            </Table>
                            <Spacer h={2} />

                            <Text h4 className="font-bitter">Ses commandes ({orders.length})</Text>
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


export default dynamic(() => Promise.resolve(UserItem), { ssr: false })

// Get data from server side before rendering page
export async function getServerSideProps({params}) {
    try {
        await dbConnect();

        const response_user = await User.findById(params.id)
        const user = JSON.parse(JSON.stringify(response_user))

        const products_response = await Product.find({ user: params.id });
        const products = JSON.parse(JSON.stringify(products_response))

        const orders_response = await Order.find({ user: params.id });
        const orders = JSON.parse(JSON.stringify(orders_response))
        
        return {
            props: {
                params, user, products, orders, loader: false
            }
        }

    } catch (error) {
        return {
            props: {
                params, user: null, products: null, orders: null, error: "Something went wrong while fetching data"
            },
        }
    }
}
