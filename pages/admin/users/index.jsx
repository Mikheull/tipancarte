import { useContext, useEffect, useState } from "react"
import Link from 'next/link'
import dynamic from "next/dynamic"
import Moment from 'react-moment';
import dbConnect from "../../../utils/database";
import User from '../../../models/User';
import { Store } from "../../../context/Store";
import LayoutAdmin from "../../../components/LayoutAdmin";
import { Table, Button, Breadcrumbs } from '@geist-ui/core'

function IndexUsers({users, loader}) {
    const { state } = useContext(Store)
    const [hasAccess, setHasAccess] = useState(false)
    const { userInfo } = state;

    const [loading, setLoading] = useState(true);
    // console.log(users)
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
                    <Link href="/admin">
                        <Breadcrumbs.Item className="cursor-pointer">Admin</Breadcrumbs.Item>
                    </Link>
                    <Breadcrumbs.Item>Utilisateurs</Breadcrumbs.Item>
                </Breadcrumbs>

                <div className="my-6 overflow-scroll">
                    {loading ? (
                        <>
                            <Table>
                                <Table.Column prop="name" label="Nom complet" />
                                <Table.Column prop="email" label="Email" />
                                <Table.Column prop="authMethod" label="Méthode d'authentification" />
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
                            users.map(function(user){
                                return { 
                                    id: user._id, 
                                    name: user.name,
                                    email: user.email,
                                    authMethod: (user.createdByGoogle) ? 'Google' : 'Email',
                                    createdAt: <Moment format="DD/MM/YYYY">{user.createdAt}</Moment>, 
                                    action: (
                                        <Link href={`/admin/users/${user._id}`} passHref>
                                            <Button>Details</Button>
                                        </Link>
                                    ) 
                                }
                            })
                        )}>
                            <Table.Column prop="name" label="Nom complet" />
                            <Table.Column prop="email" label="Email" />
                            <Table.Column prop="authMethod" label="Méthode d'authentification" />
                            <Table.Column prop="createdAt" label="Crée le" />
                            <Table.Column prop="action" label="" />
                        </Table>
                    )}
                </div>

            </div>  
        </LayoutAdmin>
    )
}


export default dynamic(() => Promise.resolve(IndexUsers), { ssr: false })

// Get data from server side before rendering page
export async function getServerSideProps() {
    try {
        await dbConnect();
        const response = await User.find({}) // GET ALL users
        const users = response.map((doc) => {
            const user = JSON.parse(JSON.stringify(doc))
            return user
        })
        return {
            props: {
                users, loader: false
            }
        }

    } catch (error) {
        return {
            props: {
                users: null, error: "Something went wrong while fetching data", // error: JSON.stringify(error)
            },
        }
    }
}
