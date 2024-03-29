import { useState, useContext } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router';
import { Transition } from 'react-transition-group';
import Cookies from 'js-cookie';
import { Store } from '../context/Store';
import { User, Popover, Badge, useBodyScroll, Spacer } from '@geist-ui/core'
import { User as UserIcon, Package, LogOut, Clipboard } from 'react-feather';

function Header({actual}) {
    const router = useRouter()
    const { state, dispatch } = useContext(Store)
    const { cart, userInfo } = state;
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [disableScroll, setDisableScroll] = useBodyScroll()

    const logOutClickHandler = () => {
        dispatch({ type: 'USER_LOG_OUT' });
        Cookies.remove('userInfo');
        Cookies.remove('cartItems');
        router.push('/')
    };

    const links = [
        {
            key: 'index',
            name: 'Accueil',
            link: '/'
        },
        {
            key: 'shop',
            name: 'Boutique',
            link: '/shop'
        },
        {
            key: 'about',
            name: 'A propos',
            link: '/about'
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
                    <div className='md:w-3/12 w-4/12'>
                        <Link href="/" passHref>
                            <a>
                                <img
                                    src="/images/brand/logo_dark.svg"
                                    className="cursor-pointer h-6 w-64"
                                    alt="Logo"
                                />
                            </a>
                        </Link>
                    </div>

                    <div className='md:w-6/12 w-0 hidden lg:flex justify-center gap-x-4'>
                        {links.map((item, i) => (
                            <Link key={i} href={item.link} passHref>
                                <a className={`text-black text-lg ${(actual == item.key) ? 'font-bold' : 'font-semibold'}`}>{item.name}</a>
                            </Link>
                        ))}
                    </div>

                    <div className='md:w-3/12 w-8/12 justify-end flex items-center'>
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
                                    <>
                                        <Popover content={(
                                            <>
                                                <Popover.Item>
                                                    <Link href="/profile"><a className='text-black flex items-center w-full'><UserIcon size={14} strokeWidth="3" className="mr-2" />Profil</a></Link>
                                                </Popover.Item>
                                                <Popover.Item>
                                                    <Link href="/profile/orders"><a className='text-black flex items-center w-full'><Package size={14} strokeWidth="3" className="mr-2" />Mes commandes</a></Link>
                                                </Popover.Item>
                                                <Popover.Item>
                                                    <Link href="/profile/products"><a className='text-black flex items-center w-full'><Clipboard size={14} strokeWidth="3" className="mr-2" />Mes pancartes</a></Link>
                                                </Popover.Item>
                                                <Popover.Item line />
                                                <Popover.Item>
                                                    <a onClick={logOutClickHandler} href="./" className='text-black flex items-center w-full'><LogOut size={14} strokeWidth="3" className="mr-2" />Déconnexion</a>
                                                </Popover.Item>
                                            </>
                                        )}>
                                            <User src="/images/brand/avatar.png" name={userInfo.name} className="cursor-pointer">
                                                {userInfo.email}
                                            </User>
                                        </Popover>
                                    </>
                                ) :
                                    (
                                        <Link href="/login" passHref>
                                            <a className="text-black font-semibold text-lg">Connexion</a>
                                        </Link>
                                    )
                            }
                            </div>

                            <div>
                                <Link href="/profile/saved" passHref>
                                    <a className='flex text-white'>
                                        <Badge.Anchor>
                                            <img
                                                src="/images/icons/heart.svg"
                                                className="cursor-pointer h-6 w-6"
                                                alt="Panier"
                                            />
                                        </Badge.Anchor>
                                    </a>
                                </Link>
                            </div>

                            <div>
                                <Link href="/cart" passHref>
                                    <a className='flex text-white'>
                                        <Badge.Anchor>
                                            <Badge scale={0.5} type="success">{cart.cartItems.length > 0 ? cart.cartItems.length : 0}</Badge>
                                            <img
                                                src="/images/icons/shopping_bag.svg"
                                                className="cursor-pointer h-6 w-6"
                                                alt="Panier"
                                            />
                                        </Badge.Anchor>
                                    </a>
                                </Link>
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
                                        <a>
                                            <img
                                                src="/images/brand/logo_light.svg"
                                                className="cursor-pointer h-6 w-64"
                                                alt="Logo"
                                            />
                                        </a>
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

                            {
                                userInfo ? (
                                    <>
                                        <Link href="/profile"><a className='text-white font-semibold text-2xl border-slate-900 border-b py-4'>Profil</a></Link>
                                        <Link href="/profile/orders"><a className='text-white font-semibold text-lg border-slate-900 border-b py-4 pl-5'>Mes commandes</a></Link>
                                        <Link href="/profile/products"><a className='text-white font-semibold text-lg border-slate-900 border-b py-4 pl-5'>Mes pancartes</a></Link>
                                        <Link href="/profile/saved"><a className='text-white font-semibold text-lg border-slate-900 border-b py-4 pl-5'>Mes sauvegardes</a></Link>
                                        <a onClick={logOutClickHandler} href="./" className='text-white font-semibold text-lg border-slate-900 border-b py-4 pl-5'>Déconnexion</a>
                                    </>
                                ) :
                                    (
                                        <Link href="/login">
                                            <a className="text-white font-semibold text-2xl border-slate-900 border-b py-4">Connexion</a>
                                        </Link>
                                    )
                            }

                            <Spacer h={1}/>

                            <Link href="/cart">
                                <a className='text-white font-semibold text-2xl border-slate-900 border-b py-4'>Panier ({cart.cartItems.length > 0 ? cart.cartItems.length : 0})</a>
                            </Link>
                        </div>
                    </div>
                )}
            </Transition>
        </>
    )
}

export default dynamic(() => Promise.resolve(Header), { ssr: false })
