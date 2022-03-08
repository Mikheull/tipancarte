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
import { Text, Input, Button, useToasts, Divider, Spacer } from '@geist-ui/core'

function Login() {
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
        <Layout title="Connexion">
            <div className="py-6 mx-auto max-w-xl md:px-4 px-10 min-h-screen flex flex-col justify-center">
                <Text h1 className="font-bitter">Connexion</Text>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={Yup.object({
                        email: Yup.string()
                        .email('L\'adresse email est invalide')
                        .required('Veuillez entrer votre adresse email'),
                        password: Yup.string().required('Veuillez entrer un mot de passe'),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        const { email, password } = values;

                        try {
                            const { data } = await axios.post('/api/users/login', { email, password })

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

                            <div className="flex flex-col w-full md:w-full">
                                <div className='flex flex-col'>
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
                        </div>

                        <div className='flex justify-between w-full items-center my-6'>
                            {formik.isSubmitting ? 
                                <Button loading auto></Button>
                            : 
                                <Button onClick={formik.handleSubmit}>Connexion</Button>
                            }
                        </div>
                    </form>
                )}
                </Formik>
                
                <div>Vous n&rsquo;avez pas de compte ? <Link href={`/register`}><a className="text-black font-bold">Cliquez ici</a></Link></div>

                <Spacer h={4}/>
                <Divider>Google</Divider>
                <Spacer h={2}/>
                <GoogleButton />
            </div>
        </Layout>
    )
}

export default Login
