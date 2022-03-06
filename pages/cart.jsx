import { useContext } from "react"
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { Store } from "../context/Store"
import {Table, Button, Text, Card } from '@geist-ui/core'

function CartPage() {
    const router = useRouter()
    const { state, dispatch } = useContext(Store)
    const { cart: { cartItems } } = state;

    const removeItemHandler = (receivedItem) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: receivedItem })
    }
    const HandlerCheckOut = () => {
        // router.push('/shipping')
        router.push('/checkout')
    }

    const data = cartItems.map(function(item){
        return { 
            id: item._id, 
            name: (
                <div className="p-4 flex items-center" >
                    <Image src="/images/shop/placeholder.jpg" width="64" height="64" alt="Image du produit"/>
                    <span className="ml-2 font-bold">{item.name}</span>
                </div>
            ),
            quantity: item.quantity, 
            price: item.price, 
            action: (
            <Button type="error" auto scale={1/3} font="12px" onClick={(() => removeItemHandler(item))}>x</Button>
            ) 
        }
    });

    return (
        <Layout title="Panier">
            <>
                <div className="my-6 mx-auto max-w-7xl md:px-0 px-10">
                    <Text h1>Mon panier</Text>
                    {
                        cartItems.length === 0 ? (
                            <div className="w-full text-center my-10">
                                <img src="/images/states/empty_cart.svg" alt="Visuel représentant un panier vide" className="md:w-1/3 w-full mx-auto" />
                                <p className="my-6">Votre panier est vide ! <Link href="/shop" passHref><strong style={{ cursor: 'pointer' }}>Créez votre pancarte ici</strong></Link></p>
                            </div>
                        ) : (
                            <div className="flex md:flex-row flex-col">
                                <div className="md:w-8/12 w-full mb-6 overflow-scroll">
                                    <Table data={data}>
                                        <Table.Column width={50} prop="name" label="Nom" />
                                        <Table.Column width={30} prop="quantity" label="Quantité" />
                                        <Table.Column width={20} prop="price" label="Prix" />
                                        <Table.Column width={10} prop="action" label="" />
                                    </Table>
                                </div>
                                <div className="md:w-1/12 w-0"></div>
                                <div className="md:w-3/12 w-full">
                                    <Card width="100%">
                                        <Text h4 my={0}>Total :</Text>
                                        <Text>{cartItems.reduce((a, c) => a + c.quantity, 0)}{' '} pancarte : <span className="font-bold">{cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}€</span></Text>
                                        
                                        <Card.Footer>
                                            <Button onClick={HandlerCheckOut}>Paiement</Button>
                                        </Card.Footer>
                                    </Card>
                                </div>
                            </div>
                        )
                    }
                </div>  
            </>
        </Layout>
    )
}
export default dynamic(() => Promise.resolve(CartPage), { ssr: false })
