import { useContext, useEffect } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import Link from 'next/link'
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Cookies from "js-cookie"
import axios from "axios";
import Layout from "../components/Layout";
import { Store } from "../context/Store"
import { Input, Button, useToasts } from '@geist-ui/core'

function Profile() {
    const { state, dispatch } = useContext(Store)
    const { userInfo } = state;
    const router = useRouter()
    const { setToast } = useToasts()

    useEffect(() => {
        // Only authenticated user can access this page
        if (!userInfo) {
            return router.push('/login')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <Layout title="Profil" >
            <div className="py-6 mx-auto max-w-6xl md:px-4 px-10 min-h-screen flex flex-col">
                <div className="border-b-2 border-gray-200">
                    <ul className="flex flex-wrap gap-x-6">
                        <li className="">
                            <Link href="/profile">
                                <a className="text-gray-800 font-bold">
                                    Profil
                                </a>
                            </Link>
                        </li>
                        <li className="">
                            <Link href="/orders">
                                <a className="text-gray-600 font-normal">
                                    Commandes
                                </a>
                            </Link>
                        </li>
                        <li className="">
                            <Link href="/saved">
                                <a className="text-gray-600">
                                    Favoris
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
    

                <div className="mt-4">
                    <Formik
                        initialValues={{ name: '' }}
                        validationSchema={Yup.object({
                            name: Yup.string().required('Veuillez entrer votre nom complet'),
                        })}
                        onSubmit={async (values, { setSubmitting }) => {
                            const { name } = values;

                            try {
                                const { data } = await axios.put('/api/users/profile', { name }, {
                                    headers: { authorization: `Bearer ${userInfo.token}` }
                                })
                                
                                dispatch({ type: (!userInfo?.createdByGoogle) ? 'USER_LOGIN_GOOGLE' : 'USER_LOGIN', payload: data })
                                Cookies.set('userInfo', JSON.stringify(data))
                                setToast({ text: "Mise à jour réussie", delay: 2000, placement: 'topRight', type: 'success' })
                            } catch (error) {
                                setToast({ text: error.response.data ? error.response.data.message : error.message, delay: 2000, placement: 'topRight', type: 'error' })
                            }

                            setSubmitting(false);
                        }}
                    >

                    {(formik) => (
                        <form>
                            <div className="flex w-full gap-4 pb-5">
                                <div className='flex flex-col w-full md:w-2/3'>
                                    <label htmlFor="name" className="text-xs sm:text-sm tracking-wide text-cdark font-lato" >
                                        Nom complet *
                                    </label>
                                    <Input
                                        name="name"
                                        id="name"
                                        className="text-sm sm:text-base mt-2.5 font-bitter w-full rounded placeholder-gray-400"
                                        width="100%"
                                        required
                                        placeholder="John Doe"
                                        initialValue={userInfo.name} 
                                        onChange={e => formik.setFieldValue('name', e.target.value)}
                                    />

                                    <div className="text-red-500 text-sm">
                                        <ErrorMessage name="name" />
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-between w-full items-center my-6'>
                                {formik.isSubmitting ? 
                                    <Button loading auto></Button>
                                : 
                                    <Button onClick={formik.handleSubmit}>Modifier</Button>
                                }
                            </div>
                        </form>
                    )}
                    </Formik>

                    {
                        !userInfo?.createdByGoogle && (
                            <Formik
                                initialValues={{ password: '', confirmPassword: '' }}
                                validationSchema={Yup.object({
                                    password: Yup.string().required('Veuillez entrer un mot de passe'),
                                    confirmPassword: Yup.string().when("password", {
                                        is: val => (val && val.length > 0 ? true : false),
                                        then: Yup.string().oneOf(
                                        [Yup.ref("password")],
                                        "Le mot de passe est différent"
                                        )
                                    }),
                                })}
                                onSubmit={async (values, { setSubmitting }) => {
                                    const { password } = values;

                                    try {
                                        const { data } = await axios.put('/api/users/profile', { password }, {
                                            headers: { authorization: `Bearer ${userInfo.token}` }
                                        })
                                        
                                        dispatch({ type: (!userInfo?.createdByGoogle) ? 'USER_LOGIN_GOOGLE' : 'USER_LOGIN', payload: data })
                                        Cookies.set('userInfo', JSON.stringify(data))
                                        setToast({ text: "Mot de passe modifié", delay: 2000, placement: 'topRight', type: 'success' })
                                    } catch (error) {
                                        setToast({ text: error.response.data ? error.response.data.message : error.message, delay: 2000, placement: 'topRight', type: 'error' })
                                    }

                                    setSubmitting(false);
                                }}
                            >

                            {(formik) => (
                                <form>
                                    <div className="flex w-full gap-4 pb-5">
                                        <div className='flex flex-col w-full md:w-2/3'>
                                            <label htmlFor="password" className="text-xs sm:text-sm tracking-wide text-cdark font-lato" >
                                                Mot de passe *
                                            </label>
                                            <Input.Password
                                                name="password"
                                                id="password"
                                                className="text-sm sm:text-base mt-2.5 font-bitter w-full rounded placeholder-gray-400"
                                                width="100%"
                                                required
                                                placeholder="***********" 
                                                onChange={e => formik.setFieldValue('password', e.target.value)}
                                            />

                                            <div className="text-red-500 text-sm">
                                                <ErrorMessage name="password" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col w-full md:w-2/3">
                                        <div className='flex flex-col'>
                                            <label htmlFor="confirmPassword" className="text-xs sm:text-sm tracking-wide text-cdark font-lato" >
                                            Confirmer le mot de passe *
                                            </label>
                                            <Input.Password
                                                name="confirmPassword"
                                                id="confirmPassword"
                                                className="text-sm sm:text-base mt-2.5 font-bitter w-full rounded placeholder-gray-400"
                                                width="100%"
                                                required
                                                placeholder="***********" 
                                                onChange={e => formik.setFieldValue('confirmPassword', e.target.value)}
                                            />

                                            <div className="text-red-500 text-sm">
                                                <ErrorMessage name="confirmPassword" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex justify-between w-full items-center my-6'>
                                        {formik.isSubmitting ? 
                                            <Button loading auto></Button>
                                        : 
                                            <Button onClick={formik.handleSubmit}>Mettre à jour</Button>
                                        }
                                    </div>
                                </form>
                            )}
                            </Formik>
                        )
                    }
                </div>
            </div>
        </Layout >
    )
}

export default dynamic(() => Promise.resolve(Profile), { ssr: false })
