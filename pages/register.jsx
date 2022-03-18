import { useContext, useEffect } from "react"
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Cookies from "js-cookie"
import axios from "axios";
import Layout from "../components/Layout"
import { Store } from "../context/Store"
import GoogleButton from "../elements/GoogleButton"
import { Text, Input, Button, useToasts, Spacer, Divider } from '@geist-ui/core'

function Register() {
    const router = useRouter()
    const { redirect } = router.query; // login?redirect=/shipping in case a page redirect here to login
    // Context-API Access
    const { state, dispatch } = useContext(Store)
    const { userInfo } = state;
    const { setToast } = useToasts()

    useEffect(() => {
        if (userInfo) {
            // If is active user then Redirect Home page
            router.push('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Layout title="Inscription ">
            <div className="py-6 mx-auto max-w-xl md:px-4 px-10 min-h-screen flex flex-col justify-center">
                <Text h1 className="font-bitter">Inscription</Text>


                <Formik
                    initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
                    validationSchema={Yup.object({
                        name: Yup.string().required('Veuillez entrer votre nom complet'),
                        email: Yup.string()
                        .email('L\'adresse email est invalide')
                        .required('Veuillez entrer votre adresse email'),
                        password: Yup.string().required('Veuillez entrer un mot de passe'),
                        changepassword: Yup.string().when("password", {
                        is: val => (val && val.length > 0 ? true : false),
                            then: Yup.string().oneOf(
                                [Yup.ref("password")],
                                "Le mot de passe est différent"
                            )
                        }),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        const { name, email, password } = values;

                        try {
                            const { data } = await axios.post('/api/users/register', {name, email, password}) // Returns an user object with a valid token

                            dispatch({ type: 'USER_LOGIN', payload: data })
                            Cookies.set('userInfo', JSON.stringify(data))
                            router.push(redirect || '/')
                        } catch (error) {
                            setToast({ text: error.response.data ? error.response.data.message : error.message, delay: 2000, placement: 'topRight', type: 'error' })
                        }

                        setSubmitting(false);
                    }}
                >

                {(formik) => (
                    <form>
                        <div>
                            <div className="flex w-full gap-4 pb-5">
                                <div className='flex flex-col w-full md:w-full'>
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
                                        onChange={e => formik.setFieldValue('name', e.target.value)}
                                    />

                                    <div className="text-red-500 text-sm">
                                        <ErrorMessage name="name" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex w-full gap-4 pb-5">
                                <div className='flex flex-col w-full md:w-full'>
                                    <label htmlFor="email" className="text-xs sm:text-sm tracking-wide text-cdark font-lato" >
                                        Email *
                                    </label>
                                    <Input
                                        name="email"
                                        id="email"
                                        className="text-sm sm:text-base mt-2.5 font-bitter w-full rounded placeholder-gray-400"
                                        width="100%"
                                        required
                                        placeholder="john.doe@gmail.com" 
                                        onChange={e => formik.setFieldValue('email', e.target.value)}
                                    />

                                    <div className="text-red-500 text-sm">
                                        <ErrorMessage name="email" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex w-full gap-4 pb-5">
                                <div className='flex flex-col w-full md:w-full'>
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

                            <div className="flex flex-col w-full md:w-full">
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
                        </div>

                        <div className='flex justify-between w-full items-center my-6'>
                            {formik.isSubmitting ? 
                                <Button loading auto></Button>
                            : 
                                <Button onClick={formik.handleSubmit}>Inscription</Button>
                            }
                        </div>
                    </form>
                )}
                </Formik>
                
                <div className="my-6">Vous avez déjà un compte ? <Link href={`/login`}><a className="text-orange-400 font-bold underline">Cliquez ici</a></Link></div>

                <Spacer h={4}/>
                <Divider>Google</Divider>
                <Spacer h={2}/>
                <GoogleButton />
            </div>
        </Layout>
    )
}

export default Register
