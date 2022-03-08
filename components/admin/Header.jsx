import { useState, useContext } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic'
import { Transition } from 'react-transition-group';
import { Store } from '../../context/Store';
import { User, useBodyScroll, Spacer } from '@geist-ui/core'

function Header({actual}) {
    const { state } = useContext(Store)
    const { userInfo } = state;
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [disableScroll, setDisableScroll] = useBodyScroll()

    const links = [
        {
            key: 'dashboard',
            name: 'Dashboard',
            link: '/admin/'
        },
        {
            key: 'users',
            name: 'Utilisateurs',
            link: '/admin/users'
        },
        {
            key: 'products',
            name: 'Produits',
            link: '/admin/products'
        },
        {
            key: 'orders',
            name: 'Commandes',
            link: '/admin/orders'
        }
    ];
    
    const defaultStyle = {
        zIndex: '2',
        transition: `height 300ms ease-in-out`,
        height: 0
    };
    
    const transitionStyles = {
        entering: { height: '100vh' },
        entered: { height: '100vh' },
        exiting: { height: 0 },
        exited: { height: 0 }
    };

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu)
        setDisableScroll(!disableScroll)
    }

    return (
        <>
            <div className="h-24 border-b border-gray-100">
                <div className='h-24 flex items-center justify-between mx-auto max-w-7xl md:px-4 px-10'>
                    <div className='md:w-2/12 w-4/12'>
                        <Link href="/" passHref>
                            <img
                                src="/images/brand/logo_dark.svg"
                                className="cursor-pointer h-6 w-64"
                                alt="Logo"
                            />
                        </Link>
                    </div>

                    <div className='md:w-8/12 w-0 hidden lg:flex justify-center gap-x-4'>
                        {links.map((item, i) => (
                            <Link key={i} href={item.link} passHref>
                                <a className={`text-black text-lg ${(actual == item.key) ? 'font-bold' : 'font-semibold'}`}>{item.name}</a>
                            </Link>
                        ))}
                    </div>

                    <div className='md:w-2/12 w-8/12 justify-end flex items-center'>
                        <div className='lg:hidden flex'>
                            <img
                                src={`/images/icons/menu.svg`}
                                className="cursor-pointer h-6"
                                alt="Burger"
                                onClick={toggleMobileMenu}
                            />
                        </div>

                        <div className="hidden lg:flex items-center gap-x-4">
                            <div>
                            {
                                userInfo ? (
                                    <User src="/images/brand/avatar.png" name={userInfo.name} className="cursor-pointer">
                                        {userInfo.email}
                                    </User>
                                ) :
                                    <Link href="/login" passHref>
                                        <a className="text-black font-semibold text-lg">Connexion</a>
                                    </Link>
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <Transition in={showMobileMenu} timeout={300}>
                {state => (
                    <div
                        className="flex lg:hidden fixed left-0 right-0 overflow-hidden"
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state],
                            top: '0'
                        }}
                    >
                        <div className="absolute top-0 left-0 right-0 h-screen bg-black flex flex-col px-10">
                            
                            <div className='h-24 flex items-center justify-between'>
                                <div className='md:w-2/12 w-4/12'>
                                    <Link href="/" passHref>
                                        <img
                                            src="/images/brand/logo_light.svg"
                                            className="cursor-pointer h-6 w-64"
                                            alt="Logo"
                                        />
                                    </Link>
                                </div>

                                <div className='md:w-2/12 w-8/12 justify-end flex items-center'>
                                    <div className='lg:hidden flex'>
                                        <img
                                            src={`/images/icons/cross-white.svg`}
                                            className="cursor-pointer h-6"
                                            alt="Burger"
                                            onClick={toggleMobileMenu}
                                        />
                                    </div>
                                </div>
                            </div>
                                
                            {links.map((item, i) => (
                                <Link key={i} href={item.link}>
                                    <a className="text-white font-semibold text-2xl border-slate-900 border-b py-4">{item.name}</a>
                                </Link>
                            ))}

                            <Spacer h={1}/>
                        </div>
                    </div>
                )}
            </Transition>
        </>
    )
}

export default dynamic(() => Promise.resolve(Header), { ssr: false })
