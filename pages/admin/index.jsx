import { useContext, useEffect, useState } from "react";
import { Store } from "../../context/Store";
import LayoutAdmin from "../../components/LayoutAdmin";

function Index() {
    const { state } = useContext(Store)
    const [hasAccess, setHasAccess] = useState(false)
    const { userInfo } = state;

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
        <LayoutAdmin title="Dashboard" actual="dashboard" >
            <div className="home">
               
            </div>
        </LayoutAdmin>
    )
}
export default Index