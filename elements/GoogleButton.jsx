import React, { useState} from "react";
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
    const [loading, setLoading] = useState(false)

    const signInGoogle = () => {
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth, provider)
    }

    const signInWithGoogleHandler = async () => {
        setLoading(true)

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
                setLoading(false)
                setToast({ text: 'Votre email est invalide', delay: 2000, placement: 'topRight', type: 'error' })
            }
        })
            .catch(() => {
                setLoading(false)
                setToast({ text: 'Erreur avec la connexion via Google, essayez une autre méthode', delay: 2000, placement: 'topRight', type: 'error' })
                // console.log(error)
            })
    }

    return (
        loading ? 
            <Button loading auto></Button>
        : 
        <>
            <Button auto onClick={signInWithGoogleHandler}>
                <img src={`/images/icons/google.svg`} className="h-6" style={{paddingRight: '10px'}} alt="Icon Google"/>
                Connexion avec Google
            </Button>
        </>
    )
}


export default GoogleButton
