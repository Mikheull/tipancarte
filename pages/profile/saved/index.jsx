import { useContext, useEffect, useReducer } from "react"
import Link from 'next/link'
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import axios from "axios";
import Layout from "../../../components/Layout";
import Topbar from "../../../components/profile/Topbar";
import { Store } from "../../../context/Store"
import { Text, useModal, Modal, useToasts} from '@geist-ui/core'
import { ArrowRight, Trash } from 'react-feather';

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, productSaved: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            state;
    }
}

const useCustomModal = () => {
    const { visible, setVisible, bindings } = useModal()
  
    const toggle = () => {
          setVisible(!visible);
    };
  
    return [visible, toggle, bindings];
  };

function SavedHistory() {
    const { state } = useContext(Store)
    const { userInfo } = state;
    const router = useRouter()
    const { setToast } = useToasts()
    const [{ loading, error, productSaved }, dispatch] = useReducer(reducer, { loading: true, productSaved: [], error: '' })

    // eslint-disable-next-line no-unused-vars
    const [visibleDelete, toggleDelete, bindingsDelete] = useCustomModal();
    
    useEffect(() => {
        if (!userInfo || !userInfo.email) {
            router.push('/login?redirect=/profile/saved')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' }); // Loading: true, error: ''
                const { data } = await axios.get(`/api/products_saved/history`, {
                    headers: { authorization: `Bearer ${userInfo.token}` }
                })
                // Send received response as payload
                dispatch({ type: 'FETCH_SUCCESS', payload: data }) // Loading: false, error: '', productSaved: [{...}, {...}]
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error })
            }
        }
        fetchOrder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const deleteProduct = async (id) => {
        try {
            const { data } = await axios.delete(`/api/products_saved/delete/${id}`, {
                headers: { authorization: `Bearer ${userInfo.token}` }
            })

            if(data){
                setToast({ text: 'Le produit à été supprimé !', delay: 2000, type: "success"})
            }else{
                setToast({ text: 'Une erreur est survenue !', delay: 2000, type: "error"})
            }
           
        } catch (error) {
            setToast({ text: 'Une erreur est survenue !', delay: 2000, type: "error"})
        }
    }

    const links = [
        {
            key: 'index',
            name: 'Profil',
            link: '/profile'
        },
        {
            key: 'orders',
            name: 'Commandes',
            link: '/profile/orders'
        },
        {
            key: 'products',
            name: 'Pancartes',
            link: '/profile/products'
        },
        {
            key: 'saved',
            name: 'Sauvegardes',
            link: '/profile/saved'
        }
    ];

    if(!userInfo) return false
    
    return (
        <Layout title="Mes favoris" >
            <Topbar links={links} actual="saved" />
            <div className="py-6 mx-auto max-w-6xl md:px-4 px-10 min-h-screen flex flex-col">
                <Text h2 className="font-bitter font-extrabold">Mes pancartes sauvegardées</Text>

                {loading ? 
                    (
                        <>
                           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                <div className="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col md:flex-row relative group" >
                                    <div className="w-full h-96 bg-slate-100 animate-pulse"></div>
                                </div>
                                <div className="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col md:flex-row relative group" >
                                    <div className="w-full h-96 bg-slate-100 animate-pulse"></div>
                                </div>
                                <div className="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col md:flex-row relative group" >
                                    <div className="w-full h-96 bg-slate-100 animate-pulse"></div>
                                </div>
                            </div>
                        </>
                    )
                    : error ? (<Text>{error}</Text>)
                        : (

                            (productSaved.length == 0) ? (
                                <div className="w-full text-center my-10">
                                    <img src="/images/states/no_products.svg" alt="Visuel représentant un contenu vide" className="md:w-2/6 w-full mx-auto mb-8" />
                                    <Link href="/shop" passHref><a style={{ cursor: 'pointer' }} className="text-orange-400 font-bold underline">Créez votre première pancarte ici</a></Link>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {
                                        productSaved.map(function(product){
                                            return (
                                                <div className="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col md:flex-row relative group" key={product.nanoId}>
                                                    <div className="w-full h-full">
                                                        <img className="object-center object-cover w-full h-full" src="/images/states/no_products.svg" alt="Visuel représentant un contenu vide" />
                                                    </div>

                                                    <Link href={`/profile/saved/${product.nanoId}`}>
                                                        <a className="absolute bottom-0 bg-gray-800 w-full h-16 flex items-center justify-center">
                                                            <span className="ml-2 font-bold text-xl truncate text-white flex items-center gap-3">{product.name} <ArrowRight size={14} strokeWidth="3" className="mr-2" /></span>
                                                        </a>
                                                    </Link>
                                                    <div className="absolute top-0 w-full hidden h-16 items-center justify-end group-hover:flex">
                                                        <Trash size={22} strokeWidth="3" className="mr-2 text-red-400 cursor-pointer" onClick={() => toggleDelete(true)} />
                                                    </div>
                                                    <Modal {...bindingsDelete}>
                                                        <Modal.Title>Supprimer ?</Modal.Title>
                                                        <Modal.Content>
                                                            <p>Vous allez supprimer définitivement cette sauvegarde.</p>
                                                        </Modal.Content>
                                                        <Modal.Action passive onClick={() => toggleDelete(false)}>Annuler</Modal.Action>
                                                        <Modal.Action onClick={() => deleteProduct(product._id)}>Supprimer</Modal.Action>
                                                    </Modal>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        
                    )
                }
            </div>  
        </Layout >
    )
}

export default dynamic(() => Promise.resolve(SavedHistory), { ssr: false })
