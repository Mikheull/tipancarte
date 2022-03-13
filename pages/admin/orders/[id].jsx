import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from 'next/link'
import Image from 'next/image'
import dynamic from "next/dynamic"
import Moment from 'react-moment';
import axios from 'axios';
import dbConnect from "../../../utils/database";
import Order from '../../../models/Order';
import User from '../../../models/User';
import { Store } from "../../../context/Store";
import LayoutAdmin from "../../../components/LayoutAdmin";
import { Breadcrumbs, Text, Spacer, Divider, Button, useModal, Modal, useToasts, Table, Tag, Card } from '@geist-ui/core'

const useCustomModal = () => {
    const { visible, setVisible, bindings } = useModal()
  
	const toggle = () => {
        setVisible(!visible);
	};
  
	return [visible, toggle, bindings];
};

function OrderItem({order, loader}) {
    const { state } = useContext(Store)
    const { userInfo } = state;
    const [hasAccess, setHasAccess] = useState(false)
    const [loading, setLoading] = useState(true);
    const router = useRouter()

    // eslint-disable-next-line no-unused-vars
    const [visibleDeletion, toggleDeletion, bindingsDeletion] = useCustomModal();
    // eslint-disable-next-line no-unused-vars
    const [visibleConfirm, toggleConfirm, bindingsConfirm] = useCustomModal();
    // eslint-disable-next-line no-unused-vars
    const [visibleShip, toggleShip, bindingsShip] = useCustomModal();
    // eslint-disable-next-line no-unused-vars
    const [visibleClosed, toggleClosed, bindingsClosed] = useCustomModal();
    
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


    const deleteOrder = async (id) => {
        try {
            const { data } = await axios.delete(`/api/orders/delete/${id}`, {
                headers: { authorization: `Bearer ${userInfo.token}` }
            })

            if(data){
                router.push('/admin/orders')
            }else{
                setToast({ text: 'Une erreur est survenue !', delay: 2000, type: "error"})
            }
           
        } catch (error) {
            setToast({ text: 'Une erreur est survenue !', delay: 2000, type: "error"})
        }
    }
    const confirmOrder = async (id) => {
        try {
            const { data } = await axios.put(`/api/orders/confirm/${id}`, {}, {
                headers: { authorization: `Bearer ${userInfo.token}` }
            })

            if(!data){
                setToast({ text: 'Une erreur est survenue !', delay: 2000, type: "error"})
            }
           
        } catch (error) {
            setToast({ text: 'Une erreur est survenue !', delay: 2000, type: "error"})
        }
    }
    const shipOrder = async (id) => {
        try {
            const { data } = await axios.put(`/api/orders/ship/${id}`, {}, {
                headers: { authorization: `Bearer ${userInfo.token}` }
            })

            if(!data){
                setToast({ text: 'Une erreur est survenue !', delay: 2000, type: "error"})
            }
           
        } catch (error) {
            setToast({ text: 'Une erreur est survenue !', delay: 2000, type: "error"})
        }
    }
    const closeOrder = async (id) => {
        try {
            const { data } = await axios.put(`/api/orders/close/${id}`, {}, {
                headers: { authorization: `Bearer ${userInfo.token}` }
            })

            if(!data){
                setToast({ text: 'Une erreur est survenue !', delay: 2000, type: "error"})
            }
           
        } catch (error) {
            setToast({ text: 'Une erreur est survenue !', delay: 2000, type: "error"})
        }
    }

    if(!hasAccess) {return 'Accès interdit !'}

    return (
        <LayoutAdmin title="Commandes" actual="orders">
            <div className="py-6 mx-auto max-w-6xl md:px-4 px-10 min-h-screen flex flex-col">
                <Breadcrumbs>
                    <Link href="/admin" passHref>
                        <Breadcrumbs.Item className="cursor-pointer">Admin</Breadcrumbs.Item>
                    </Link>
                    <Link href="/admin/orders" passHref>
                        <Breadcrumbs.Item className="cursor-pointer">Commandes</Breadcrumbs.Item>
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
                            <Text h3 className="font-bitter">Commande : {order.name}</Text>
                            <Text p>Crée le {<Moment format="DD/MM/YYYY à HH[h]mm">{order.createdAt}</Moment>} par {(order.user) ? order.user.name : 'Anonyme'}</Text>
                            <Spacer h={2} />
                            <div className="flex flex-col gap-2 w-full md:w-1/2">
                                <Button className="mt-6" type="error" auto onClick={() => toggleDeletion(true)}>Supprimer la commande</Button>
                                <Modal {...bindingsDeletion}>
                                    <Modal.Title>Supprimer</Modal.Title>
                                    <Modal.Content>
                                        <p>Êtes vous sûr de vouloir supprimer cette commande ?</p>
                                    </Modal.Content>
                                    <Modal.Action passive onClick={() => toggleDeletion(false)}>Annuler</Modal.Action>
                                    <Modal.Action onClick={() => deleteOrder(order._id)}>Confirmer</Modal.Action>
                                </Modal>
                            </div>

                            <Spacer h={5} />

                            <div>
                                <div className="w-full mb-6 overflow-scroll">
                                    <Table data={
                                        order.orderItems.map(function(item){
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
                                            <Text h4 className="font-bold">{order.orderItems.reduce((a, c) => a + c.price, 0)}€</Text>
                                        </div>
                                        <div className="flex justify-between">
                                            <Text h4>Frais</Text>
                                            <Text h4 className="font-bold">{order.taxPrice}€</Text>
                                        </div>
                                        <div className="flex justify-between">
                                            <Text h4>Livraison</Text>
                                            <Text h4 className="font-bold">{order.shippingPrice}€</Text>
                                        </div>
                                        <div className="flex justify-between">
                                            <Text h4>Total</Text>
                                            <Text h4 className="font-bold">{order.totalPrice}€</Text>
                                        </div>
                                    </div>
                                </div>
                                
                                <Spacer h={2} />

                                <div className=" w-full">
                                    <div className="bg-gray-50 px-8 py-6">
                                        <Text h4 className="font-bitter">Adresse de livraison</Text>
                                        <Card>
                                            <Text>{order.shippingAddress.fullName}</Text>
                                            <Text>{order.shippingAddress.address}</Text>
                                            <Text>{order.shippingAddress.city}</Text>
                                            <Text>{order.shippingAddress.postalCode}</Text>
                                            <Text>{order.shippingAddress.country}</Text>
                                            <Card.Footer>
                                                <Text>Status: <Tag>{order.isDelivered ? <Moment format="[Livré le] DD/MM/YYYY à HH[h]mm">{order.deliveredAt}</Moment> : 'Non livré'}</Tag></Text>
                                            </Card.Footer>
                                        </Card>

                                        <Spacer h={2} />

                                        <Text h4 className="font-bitter">Méthode de paiement</Text>
                                        <Card>
                                            <Text>
                                                {!order.isPaid && (
                                                    <div>
                                                        {order.isPending ? (
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
                                                                   
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                )}
                                                <Text>Status: <Tag>{order.isPaid ? <Moment format="[Payé le] DD/MM/YYYY à HH[h]mm">{order.paidAt}</Moment> : 'Non payé'}</Tag></Text>
                                            </Text>
                                        </Card>

                                    </div>
                                </div>
                            </div>
                            <Divider />
                            <Spacer h={5} />

                            <Text h4 className="font-bitter">Actions</Text>
                        
                            <div className="flex flex-col gap-2 w-full md:w-1/2">
                                {!order.isConfirmed ? (
                                    <>
                                        <Button className="mt-6" auto onClick={() => toggleConfirm(true)}>Confirmer la commande</Button>
                                        <Modal {...bindingsConfirm}>
                                            <Modal.Title>Confirmer</Modal.Title>
                                            <Modal.Content>
                                                <p>Êtes vous sûr de vouloir confirmer cette commande ?</p>
                                            </Modal.Content>
                                            <Modal.Action passive onClick={() => toggleConfirm(false)}>Annuler</Modal.Action>
                                            <Modal.Action onClick={() => confirmOrder(order._id)}>Confirmer</Modal.Action>
                                        </Modal>
                                    </>
                                ) : (
                                    <>
                                        <Button className="mt-6" disabled>Confirmer la commande</Button>
                                        <Text p>Confirmé le {<Moment format="DD/MM/YYYY à HH[h]mm">{order.confirmedAt}</Moment>}</Text>
                                    </>
                                )}
                                
                                {!order.isDelivered ? (
                                    <>
                                        <Button className="mt-6" auto onClick={() => toggleShip(true)}>Déclencher la livraison</Button>
                                        <Modal {...bindingsShip}>
                                            <Modal.Title>Livrer</Modal.Title>
                                            <Modal.Content>
                                                <p>Êtes vous sûr de vouloir déclencher la livraison ?</p>
                                            </Modal.Content>
                                            <Modal.Action passive onClick={() => toggleShip(false)}>Annuler</Modal.Action>
                                            <Modal.Action onClick={() => shipOrder(order._id)}>Confirmer</Modal.Action>
                                        </Modal>
                                    </>
                                ) : (
                                    <>
                                        <Button className="mt-6" disabled>Déclencher la livraison</Button>
                                        <Text p>Livré le {<Moment format="DD/MM/YYYY à HH[h]mm">{order.deliveredAt}</Moment>}</Text>
                                    </>
                                )}
                                
                                {!order.isClosed ? (
                                    <>
                                        <Button className="mt-6" auto onClick={() => toggleClosed(true)}>Clôre la commande</Button>
                                        <Modal {...bindingsClosed}>
                                            <Modal.Title>Clôre</Modal.Title>
                                            <Modal.Content>
                                                <p>Êtes vous sûr de vouloir clôre cette commande ?</p>
                                            </Modal.Content>
                                            <Modal.Action passive onClick={() => toggleClosed(false)}>Annuler</Modal.Action>
                                            <Modal.Action onClick={() => closeOrder(order._id)}>Confirmer</Modal.Action>
                                        </Modal>
                                    </>
                                ) : (
                                    <>
                                        <Button className="mt-6" disabled>Clôre la commande</Button>
                                        <Text p>Clôturé le {<Moment format="DD/MM/YYYY à HH[h]mm">{order.closedAt}</Moment>}</Text>
                                    </>
                                )}
                                
                            </div>
                        </>
                        
                    )}
                </div>

            </div>  
        </LayoutAdmin>
    )
}


export default dynamic(() => Promise.resolve(OrderItem), { ssr: false })

// Get data from server side before rendering page
export async function getServerSideProps({params}) {
    try {
        await dbConnect();
        const response_orders = await Order.findOne({nanoId: params.id}).populate({path: 'user', model: User, select: 'name'});
        const order = JSON.parse(JSON.stringify(response_orders))

        return {
            props: {
                params, order ,loader: false
            }
        }

    } catch (error) {
        return {
            props: {
                params, order: null, error: "Something went wrong while fetching data"
            },
        }
    }
}
