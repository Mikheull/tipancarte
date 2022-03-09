import { useContext, useEffect, useState } from "react"
import Link from 'next/link'
import Image from 'next/image'
import dynamic from "next/dynamic"
import Moment from 'react-moment';
import dbConnect from "../../../utils/database";
import Product from '../../../models/Product';
import { Store } from "../../../context/Store";
import LayoutAdmin from "../../../components/LayoutAdmin";
import { Table, Button, Breadcrumbs } from '@geist-ui/core'

function IndexProducts({products, loader}) {
    const { state } = useContext(Store)
    const [hasAccess, setHasAccess] = useState(false)
    const { userInfo } = state;

    const [loading, setLoading] = useState(true);
    // console.log(products)
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
        <LayoutAdmin title="Produits" actual="products">
            <div className="py-6 mx-auto max-w-6xl md:px-4 px-10 min-h-screen flex flex-col">
                <Breadcrumbs>
                    <Link href="/admin" passHref>
                        <Breadcrumbs.Item className="cursor-pointer">Admin</Breadcrumbs.Item>
                    </Link>
                    <Breadcrumbs.Item>Produits</Breadcrumbs.Item>
                </Breadcrumbs>

                <div className="my-6 overflow-scroll">
                    {loading ? (
                        <>
                            <Table>
                                <Table.Column prop="nanoId" label="Id" />
                                <Table.Column prop="name" label="Nom" />
                                <Table.Column prop="price" label="prix" />
                                <Table.Column prop="createdAt" label="Crée le" />
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
                            products.map(function(product){
                                return { 
                                    id: product._id, 
                                    nanoId: product.nanoId, 
                                    name: (
                                        <div className="p-4" >
                                            <Link href={`/preview/${product.nanoId}`}>
                                                <a className="flex items-center text-black">
                                                    <Image src={product.image} width="64" height="64" alt="Image du produit"/>
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
                    )}
                </div>

            </div>  
        </LayoutAdmin>
    )
}


export default dynamic(() => Promise.resolve(IndexProducts), { ssr: false })

// Get data from server side before rendering page
export async function getServerSideProps() {
    try {
        await dbConnect();
        const response = await Product.find({}) // GET ALL products
        const products = response.map((doc) => {
            const user = JSON.parse(JSON.stringify(doc))
            return user
        })
        return {
            props: {
                products, loader: false
            }
        }

    } catch (error) {
        return {
            props: {
                products: null, error: "Something went wrong while fetching data", // error: JSON.stringify(error)
            },
        }
    }
}
