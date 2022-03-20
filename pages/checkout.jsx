import { useContext, useEffect } from "react"
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useRouter } from "next/router";
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Cookies from "js-cookie"
import axios from "axios";
import Layout from "../components/Layout";
import { Store } from "../context/Store"
import { Button, Text, Input, Radio, Divider, useToasts, Spacer } from '@geist-ui/core'

function Checkout() {
    const router = useRouter()
    const { state, dispatch } = useContext(Store)
    const { userInfo, cart: { cartItems } } = state;
    const { setToast } = useToasts()

    useEffect(() => {
        if (!userInfo || !userInfo.email) {
            router.push('/login?redirect=/checkout')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const round2 = (number) => {
        return Math.round(number * 100 + Number.EPSILON) / 100; // 123.466 = 123.47
    }
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    if(!userInfo) return false

    return (
        <Layout title="Paiement">
            <div className="py-6 mx-auto max-w-6xl md:px-4 px-10 min-h-screen flex flex-col">
                <div className="w-full">
                    <Text h1 className="font-bitter">Paiement</Text>
                </div>
            
                <div className="flex md:flex-row flex-col mt-10">
                    <div className="md:w-6/12 w-full mb-6">
                        <Formik
                            initialValues={{ name: '', email: '', telephone: '', country: '', city: '', address: '', address2: '', postalCode: '', comment: '', paymentMethod: 'paypal'}}
                            validationSchema={Yup.object({
                                name: Yup.string().required('Veuillez entrer votre nom complet'),
                                email: Yup.string()
                                .email('L\'adresse email est invalide')
                                .required('Veuillez entrer votre adresse email'),
                                telephone: Yup.string().matches(phoneRegExp, 'Le numéro de téléphone est invalide'),
                                country: Yup.string().required('Veuillez entrer votre pays'),
                                city: Yup.string().required('Veuillez entrer votre ville'),
                                address: Yup.string().required('Veuillez entrer votre adresse'),
                                address2: Yup.string(),
                                postalCode: Yup.string().required('Veuillez entrer votre code postal'),
                                comment: Yup.string(),
                                paymentMethod: Yup.string().required('Veuillez choisir un moyen de paiement'),
                            })}
                            onSubmit={async (values, { setSubmitting }) => {
                                const { name, telephone, address, address2, city, postalCode, country, paymentMethod, comment} = values;

                                try {
                                    const shippingAddress = {fullName: name, telephone, address, address2, city, postalCode, country}

                                    const price = cartItems.reduce((a, c) => a + c.price, 0);
                                    const shippingPrice = 4.90;
                                    // const taxPrice = round2(price * 0.20) // TVA
                                    const taxPrice = 0;
                                    const totalPrice = round2(price + taxPrice + shippingPrice)
                                    
                                    if(userInfo.token){
                                        const { data } = await axios.post('/api/orders', {
                                            orderItems: cartItems,
                                            paymentMethod,
                                            shippingAddress,
                                            shippingPrice,
                                            comment,
                                            taxPrice,
                                            totalPrice,
                                            itemsPrice: price,
                                        }, {
                                            headers: {
                                                authorization: `Bearer ${userInfo.token}`
                                            }
                                        })
                                        // Clear All cartItems state and Cookies
                                        dispatch({ type: 'CART_CLEAR' })
                                        Cookies.remove('cartItems')
                                        // Push user to Single order details page (REQUIRES DATA._ID RESPONSE)
                                        router.push(`/profile/orders/${data.nanoId}`)
                                    }else{
                                        setToast({ text: 'Connectez vous pour passer commande', delay: 2000, placement: 'topRight', type: 'error' })
                                        router.push('/login?redirect=/checkout')
                                    }
                                    
                                } catch (error) {
                                    setToast({ text: error.message, delay: 2000, placement: 'topRight', type: 'error' })
                                }

                                setSubmitting(false);
                            }}
                        >

                        {(formik) => (
                            <form>
                                <div>
                                    <Text h4>Client</Text>

                                    <div className="flex w-full gap-4 pb-5">
                                        <div className="flex flex-col w-1/2">
                                            <div className='flex flex-col'>
                                            <label htmlFor="name" className="text-xs sm:text-sm tracking-wide text-cdark font-lato" >
                                                Nom complet *
                                            </label>
                                            <Input
                                                name="name"
                                                id="name"
                                                className="text-sm sm:text-base mt-2.5 font-bitter w-full rounded placeholder-gray-400"
                                                width="100%"
                                                required
                                                onChange={e => formik.setFieldValue('name', e.target.value)}
                                                placeholder="John Doe" 
                                            />
                                            </div>
                                        </div>

                                        <div className="flex flex-col w-1/2">
                                            <div className='flex flex-col'>
                                            <label htmlFor="email" className="text-xs sm:text-sm tracking-wide text-cdark font-lato" >
                                            Email *
                                            </label>
                                            <Input
                                                name="email"
                                                id="email"
                                                className="text-sm sm:text-base mt-2.5 font-bitter w-full rounded placeholder-gray-400"
                                                width="100%"
                                                required
                                                onChange={e => formik.setFieldValue('email', e.target.value)}
                                                placeholder="john.doe@gmail.com" 
                                            />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex w-full md:gap-4 gap-0 pb-5">
                                        <div className="flex flex-col md:w-1/2 w-full">
                                            <div className='flex flex-col'>
                                            <label htmlFor="telephone" className="text-xs sm:text-sm tracking-wide text-cdark font-lato" >
                                                Téléphone
                                            </label>
                                            <Input
                                                name="telephone"
                                                id="telephone"
                                                className="text-sm sm:text-base mt-2.5 font-bitter w-full rounded placeholder-gray-400"
                                                width="100%"
                                                placeholder="0607080910" 
                                                onChange={e => formik.setFieldValue('telephone', e.target.value)}
                                            />
                                            </div>

                                            <div className="text-red-500 text-sm">
                                                <ErrorMessage name="telephone" />
                                            </div>
                                        </div>
                                        <div className='flex flex-col md:w-1/2 w-0'></div>
                                    </div>
                                </div>

                                <Spacer h={4} />
                                <div>
                                    <Text h4>Adresse de livraison</Text>
                                    
                                    <div className="flex w-full gap-4 pb-5">
                                        <div className="flex flex-col w-1/2">
                                            <div className='flex flex-col'>
                                            <label htmlFor="country" className="text-xs sm:text-sm tracking-wide text-cdark font-lato" >
                                                Pays *
                                            </label>
                                            <Input
                                                name="country"
                                                id="country"
                                                className="text-sm sm:text-base mt-2.5 font-bitter w-full rounded placeholder-gray-400"
                                                width="100%"
                                                onChange={e => formik.setFieldValue('country', e.target.value)}
                                                required
                                                placeholder="France" 
                                            />
                                            </div>

                                            <div className="text-red-500 text-sm">
                                                <ErrorMessage name="country" />
                                            </div>
                                        </div>

                                        <div className="flex flex-col w-1/2">
                                            <div className='flex flex-col'>
                                            <label htmlFor="city" className="text-xs sm:text-sm tracking-wide text-cdark font-lato" >
                                            city *
                                            </label>
                                            <Input
                                                name="city"
                                                id="city"
                                                className="text-sm sm:text-base mt-2.5 font-bitter w-full rounded placeholder-gray-400"
                                                width="100%"
                                                onChange={e => formik.setFieldValue('city', e.target.value)}
                                                required
                                                placeholder="Paris" 
                                            />
                                            </div>

                                            <div className="text-red-500 text-sm">
                                                <ErrorMessage name="city" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex w-full gap-4 pb-5">
                                        <div className="flex flex-col w-1/2">
                                            <div className='flex flex-col'>
                                            <label htmlFor="address" className="text-xs sm:text-sm tracking-wide text-cdark font-lato" >
                                                Adresse *
                                            </label>
                                            <Input
                                                name="address"
                                                id="address"
                                                className="text-sm sm:text-base mt-2.5 font-bitter w-full rounded placeholder-gray-400"
                                                width="100%"
                                                onChange={e => formik.setFieldValue('address', e.target.value)}
                                                required
                                                placeholder="82 rue de la paix" 
                                            />
                                            </div>

                                            <div className="text-red-500 text-sm">
                                                <ErrorMessage name="address" />
                                            </div>
                                        </div>

                                        <div className="flex flex-col w-1/2">
                                            <div className='flex flex-col'>
                                            <label htmlFor="address2" className="text-xs sm:text-sm tracking-wide text-cdark font-lato" >
                                                Adresse ligne 2 (optionnelle)
                                            </label>
                                            <Input
                                                name="address2"
                                                id="address2"
                                                className="text-sm sm:text-base mt-2.5 font-bitter w-full rounded placeholder-gray-400"
                                                width="100%"
                                                onChange={e => formik.setFieldValue('address2', e.target.value)}
                                                placeholder="Appt 2, étage 7" 
                                            />
                                            </div>

                                            <div className="text-red-500 text-sm">
                                                <ErrorMessage name="address2" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex w-full md:gap-4 gap-0 pb-5">
                                        <div className="flex flex-col md:w-1/2 w-full">
                                            <div className='flex flex-col'>
                                                <label htmlFor="postalCode" className="text-xs sm:text-sm tracking-wide text-cdark font-lato" >
                                                    Code postal *
                                                </label>
                                                <Input
                                                    name="postalCode"
                                                    id="postalCode"
                                                    className="text-sm sm:text-base mt-2.5 font-bitter w-full rounded placeholder-gray-400"
                                                    width="100%"
                                                    placeholder="75001" 
                                                    required
                                                    onChange={e => formik.setFieldValue('postalCode', e.target.value)}
                                                />
                                            </div>

                                            <div className="text-red-500 text-sm">
                                                <ErrorMessage name="postalCode" />
                                            </div>
                                        </div>
                                        <div className='flex flex-col md:w-1/2 w-0'></div>
                                    </div>

                                    <div className="flex w-full md:gap-4 gap-0 pb-5">
                                        <div className="flex flex-col w-full">
                                            <div className='flex flex-col'>
                                                <label htmlFor="comment" className="text-xs sm:text-sm tracking-wide text-cdark font-lato" >
                                                    Commentaire
                                                </label>
                                                <Input.Textarea
                                                    name="comment"
                                                    id="comment"
                                                    className="text-sm sm:text-base mt-2.5 font-bitter w-full rounded placeholder-gray-400"
                                                    width="100%"
                                                    height="150px"
                                                    onChange={e => formik.setFieldValue('comment', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Spacer h={4} />
                                <div>
                                    <Text h4>Paiement</Text>

                                    <Radio.Group value="paypal" useRow onChange={e => formik.setFieldValue('paymentMethod', e)}>
                                        <Radio value="paypal">
                                            Paypal
                                            <Radio.Desc>Payer via Paypal</Radio.Desc>
                                        </Radio>
                                    </Radio.Group>
                                </div>

                                <Spacer h={2} />
                                <Text p>En passant commande, vous reconnaissez avoir pris connaissance de notre politique des gestions personnelles et acceptez nos Conditions Générales de Vente</Text>

                                <Spacer h={4} />
                                <div className='flex w-full pb-10 items-center'>
                                    <div className="w-full">
                                        {formik.isSubmitting ? 
                                            <Button loading auto></Button>
                                        : 
                                            <button disabled={formik.isSubmitting} onClick={formik.handleSubmit} className="h-12 w-full bg-black text-white hover:bg-white hover:text-black hover:border border border-black items-center text-center" type="button">
                                                Payer
                                            </button>
                                        }
                                    </div>
                                </div>
                            </form>
                        )}
                        </Formik>
                    </div>
                    <div className="md:w-1/12 w-0"></div>
                    <div className="md:w-5/12 w-full">
                        <div className="bg-gray-50 px-8 py-6">
                            <Text h4 className="font-bitter">Votre commande</Text>
                            <Divider />
                            <Spacer h={1} />

                            {
                                cartItems.length === 0 ? (
                                    <div className="flex flex-col w-full">
                                        Votre panier est vide !
                                    </div>
                                ) : (
                                    <div className="flex flex-col w-full">
                                        {
                                            cartItems.map(function(item){
                                                return (
                                                    <>
                                                        <div className="flex flex-row">
                                                            <div className="w-1/6">
                                                                <Image src={item.image_preview} alt="Image du produit" width="100" height="100" />
                                                            </div>
                                                            <div className="w-4/6 ml-2">{item.name}</div>
                                                            <div className="w-1/6 font-bold text-right font-bitter">{item.price} €</div>
                                                        </div>
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            }
                            <Divider />
                            <Spacer h={2} />

                            <div className="flex flex-col font-bitter">
                                <div className="flex justify-between">
                                    <Text h6>Sous-total</Text>
                                    <Text h6 className="font-bold">{cartItems.reduce((a, c) => a + c.price, 0)}€</Text>
                                </div>
                                <div className="flex justify-between">
                                    <Text h6>Frais</Text>
                                    <Text h6 className="font-bold">0€</Text>
                                </div>
                                <div className="flex justify-between">
                                    <Text h6>Livraison</Text>
                                    <Text h6 className="font-bold">4.9€</Text>
                                </div>
                                <div className="flex justify-between">
                                    <Text h6>Réduction</Text>
                                    <Text h6 className="font-bold">Pas de réduction appliquée</Text>
                                </div>
                            </div>
                            <Divider />
                            <Spacer h={2} />

                            <div className="flex justify-between font-bitter">
                                <Text h4 my={0}>Total :</Text>
                                <Text h5 className="font-bold">{cartItems.reduce((a, c) => a + c.price, 0) + 4.9}€</Text>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        </Layout>
    )
}
export default dynamic(() => Promise.resolve(Checkout), { ssr: false })
