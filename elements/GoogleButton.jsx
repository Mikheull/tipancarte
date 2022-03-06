import * as React from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import axios from 'axios';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../utils/firebase';
import { Store } from '../context/Store';
import { Button, useToasts } from '@geist-ui/core'

function GoogleButton() {
    const router = useRouter()
    const { redirect } = router.query;
    const { dispatch } = React.useContext(Store)
    const { setToast } = useToasts()

    const signInGoogle = () => {
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth, provider)
    }

    const signInWithGoogleHandler = async () => {
        signInGoogle().then(async (user) => {
            try {
                // user.user to get access its credentials
                const { data } = await axios.post('/api/users/registerGoogle', user.user)
                // console.log('Backend response:', data)
                // SAVING THE RETURNED DATA (OBJECT) INTO GLOBAL STATE (CONTEXT)
                dispatch({ type: 'USER_LOGIN_GOOGLE', payload: data })
                setToast({ text: 'Connexion réussie !', delay: 2000, placement: 'topRight', type: 'success' })
                Cookies.set('userInfo', JSON.stringify(data))
                return router.push(redirect || '/')
            } catch (error) {
                // console.log(error.response)
                setToast({ text: 'Votre email est invalide', delay: 2000, placement: 'topRight', type: 'error' })
            }
        })
            .catch((error) => {
                setToast({ text: 'Erreur avec la connexion via Google, essayez une autre méthode', delay: 2000, placement: 'topRight', type: 'error' })
                // console.log(error)
            })
    }

    return (
        <Button icon={ <img src={`/images/icons/google.svg`} className="h-6" alt="Icon Google"/>} auto onClick={signInWithGoogleHandler}>Connexion avec Google</Button>
    )
}

export default GoogleButton
