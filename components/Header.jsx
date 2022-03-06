import { useState, useContext } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router';
import { Transition } from 'react-transition-group';
import Cookies from 'js-cookie';
import { Store } from '../context/Store';
import { Text, User, Popover, Badge, useBodyScroll, Spacer } from '@geist-ui/core'

function Header() {
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
            name: 'Accueil',
            link: '/'
        },
        {
            name: 'Boutique',
            link: '/shop'
        },
        // {
        //     name: 'A propos',
        //     link: '/about'
        // }
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
            <div className="bg-white border-b border-black px-4 py-2">
                <div className="container mx-auto flex items-center justify-between">
                    <div>
                        <Link href="/" passHref>
                            <img
                                src="/images/brand/logo_dark.svg"
                                className="cursor-pointer h-6"
                                alt="Logo"
                            />
                        </Link>
                    </div>

                    <ul className="hidden w-8/12 lg:flex items-center justify-center space-x-8">
                        {links.map((item, i) => (
                            <Link key={i} href={item.link} passHref>
                                <a className="text-black font-semibold text-lg">{item.name}</a>
                            </Link>
                        ))}
                    </ul>

                    <div className="md:w-2/12 justify-end flex items-center space-x-4 xl:space-x-8">

                        <div className='lg:hidden flex'>
                            <img
                                src={`/images/icons/${showMobileMenu ? 'cross' : 'menu'}.svg`}
                                className="cursor-pointer h-6"
                                alt="Burger"
                                onClick={toggleMobileMenu}
                            />
                        </div>
                        
                        <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
                            <div>
                            {
                                userInfo ? (
                                    <>
                                        <Popover content={(
                                            <>
                                                <Popover.Item>
                                                    <Link href="/profile"><a className='text-black'>Profile</a></Link>
                                                </Popover.Item>
                                                <Popover.Item>
                                                    <Link href="/orders"><a className='text-black'>Mes commandes</a></Link>
                                                </Popover.Item>
                                                <Popover.Item line />
                                                <Popover.Item>
                                                    <a onClick={logOutClickHandler} href="./" className='text-black'>Déconnexion</a>
                                                </Popover.Item>
                                            </>
                                        )}>
                                            <User src="https://unix.bio/assets/avatar.png" name={userInfo.name} className="cursor-pointer">
                                                {userInfo.email}
                                            </User>
                                        </Popover>
                                    </>
                                ) :
                                    (
                                        <Link href="login" passHref>
                                            <a className="text-black font-semibold text-lg">Connexion</a>
                                        </Link>
                                    )
                            }
                            </div>
                            <div>
                                <Link href="cart" passHref>
                                    <Text className='flex text-white'>
                                        <Badge.Anchor>
                                            <Badge scale={0.5} type="warning">{cart.cartItems.length > 0 ? cart.cartItems.length : 0}</Badge>
                                            <img
                                                src="/images/icons/cartbag.svg"
                                                className="cursor-pointer h-8 w-8"
                                                alt="Cart"
                                            />
                                        </Badge.Anchor>
                                    </Text>
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
                        top: '1.5em'
                    }}
                    >
                        <div
                            className="absolute top-0 left-0 right-0 h-screen bg-black flex flex-col justify-center"
                            style={{
                            top: '1em'
                            }}
                        >
                            {links.map((item, i) => (
                                <Link key={i} href={item.link}>
                                    <a className="text-white font-semibold text-2xl text-center">{item.name}</a>
                                </Link>
                            ))}

                            <Spacer h={2}/>

                            {
                                userInfo ? (
                                    <>
                                        <Link href="/profile"><a className='text-white font-semibold text-2xl text-center'>Profile</a></Link>
                                        <Link href="/orders"><a className='text-white font-semibold text-2xl text-center'>Mes commandes</a></Link>
                                        <a onClick={logOutClickHandler} href="./" className='text-white font-semibold text-2xl text-center'>Déconnexion</a>
                                    </>
                                ) :
                                    (
                                        <Link href="login">
                                            <a className="text-white font-semibold text-lg">Connexion</a>
                                        </Link>
                                    )
                            }

                            <Spacer h={2}/>

                            <Link href="cart">
                                <a className='text-white font-semibold text-2xl text-center'>Panier ({cart.cartItems.length > 0 ? cart.cartItems.length : 0})</a>
                            </Link>
                        </div>
                    </div>
                )}
            </Transition>
        </>
    )
}

export default dynamic(() => Promise.resolve(Header), { ssr: false })
