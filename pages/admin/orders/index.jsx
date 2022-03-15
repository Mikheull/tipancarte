import { useContext, useEffect, useState } from "react"
import Link from 'next/link'
import dynamic from "next/dynamic"
import Moment from 'react-moment';
import dbConnect from "../../../utils/database";
import Order from '../../../models/Order';
import User from '../../../models/User';
import { Store } from "../../../context/Store";
import LayoutAdmin from "../../../components/LayoutAdmin";
import { Table, Button, Breadcrumbs } from '@geist-ui/core'

function IndexOrders({orders, loader}) {
    const { state } = useContext(Store)
    const [hasAccess, setHasAccess] = useState(false)
    const { userInfo } = state;

    const [loading, setLoading] = useState(true);
    // console.log(orders)
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

    if(!hasAccess) {return 'Accès interdit !'}

    return (
        <LayoutAdmin title="Commandes" actual="orders">
            <div className="py-6 mx-auto max-w-6xl md:px-4 px-10 min-h-screen flex flex-col">
                <Breadcrumbs>
                    <Link href="/admin" passHref>
                        <Breadcrumbs.Item className="cursor-pointer">Admin</Breadcrumbs.Item>
                    </Link>
                    <Breadcrumbs.Item>Commandes</Breadcrumbs.Item>
                </Breadcrumbs>

                <div className="my-6 overflow-scroll">
                    {loading ? (
                        <>
                            <Table>
                                <Table.Column prop="nanoId" label="ID" />
                                <Table.Column prop="date" label="Date de commande" />
                                <Table.Column prop="total" label="Total" />
                                <Table.Column prop="paid" label="Payée" />
                                <Table.Column prop="delivered" label="Livrée" />
                                <Table.Column prop="createdBy" label="Commandé par" />
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
                    : 
                    (
                        <Table data={(
                            orders.map(function(order){
                                return { 
                                    id: order._id, 
                                    nanoId: order.nanoId, 
                                    date: <Moment format="DD/MM/YYYY">{order.createdAt}</Moment>, 
                                    total: `${order.totalPrice}€`,
                                    paid: order.isPaid ? <Moment format="[Payée le] DD/MM/YYYY à HH[h]mm">{order.paidAt}</Moment> : 'Non payée', 
                                    delivered: order.isDelivered ?  <Moment format="[Livré le] DD/MM/YYYY à HH[h]mm">{order.deliveredAt}</Moment> : 'Non livré', 
                                    createdBy: (order.user) ? (
                                        <Link href={`/admin/users/${order.user._id}`}>
                                            <a className="flex items-center text-black">
                                                <span className="ml-2 font-bold">{order.user.name}</span>
                                            </a>
                                        </Link>
                                    ) : 'Anonyme', 
                                    
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
                            <Table.Column prop="createdBy" label="Commandé par" />
                            <Table.Column prop="action" label="" />
                        </Table>
                    )}
                </div>

            </div>  
        </LayoutAdmin>
    )
}


export default dynamic(() => Promise.resolve(IndexOrders), { ssr: false })

// Get data from server side before rendering page
export async function getServerSideProps() {
    try {
        await dbConnect();
        const response = await Order.find({}).populate({path: 'user', model: User, select: 'name'});
        const orders = JSON.parse(JSON.stringify(response))
        
        return {
            props: {
                orders, loader: false
            }
        }

    } catch (error) {
        return {
            props: {
                orders: null, error: "Something went wrong while fetching data", // error: JSON.stringify(error)
            },
        }
    }
}
