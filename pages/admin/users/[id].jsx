import { useContext, useEffect, useState } from "react"
import Link from 'next/link'
import dynamic from "next/dynamic"
import dbConnect from "../../../utils/database";
import User from '../../../models/User';
import Product from '../../../models/Product';
import Order from '../../../models/Order';
import { Store } from "../../../context/Store";
import LayoutAdmin from "../../../components/LayoutAdmin";
import { Breadcrumbs } from '@geist-ui/core'

function IndexUsers({user, products, orders, loader}) {
    const { state } = useContext(Store)
    const { userInfo } = state;
    const [hasAccess, setHasAccess] = useState(false)
    const [loading, setLoading] = useState(true);

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
        <LayoutAdmin title="Utilisateurs" actual="users">
            <div className="py-6 mx-auto max-w-6xl md:px-4 px-10 min-h-screen flex flex-col">
                <Breadcrumbs>
                    <Link href="/admin" passHref>
                        <Breadcrumbs.Item className="cursor-pointer">Admin</Breadcrumbs.Item>
                    </Link>
                    <Breadcrumbs.Item>Utilisateurs</Breadcrumbs.Item>
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
                            User : {JSON.stringify(user)}
                            Products : {JSON.stringify(products)}
                            Commandes : {JSON.stringify(orders)}
                        </>
                        
                    )}
                </div>

            </div>  
        </LayoutAdmin>
    )
}


export default dynamic(() => Promise.resolve(IndexUsers), { ssr: false })

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
