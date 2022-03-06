import Link from 'next/link';

function Footer() {
    // const links = [
    //     {
    //         name: 'A propos',
    //         link: '/about'
    //     },
    //     {
    //         name: 'Conditions générales de vente',
    //         link: '/cgv'
    //     },
    //     {
    //         name: 'Contact',
    //         link: '/contact'
    //     },
    // ];

    return (
        <footer className="p-4 bg-white md:px-6 md:py-8 dark:bg-gray-800">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div className='mb-4 sm:mb-0'>
                    <Link href="/" passHref>
                        <img
                            src="/images/brand/logo_light.svg"
                            className="cursor-pointer h-6"
                            alt="Logo"
                        />
                    </Link>
                </div>

                <ul className="flex flex-wrap gap-6 items-center mb-6 sm:mb-0">
                    {/* {links.map((item, i) => (
                        <Link key={i} href={item.link} passHref>
                            <a className="text-gray-100 font-semibold text-sm">{item.name}</a>
                        </Link>
                    ))} */}
                </ul>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">&copy; { new Date().getFullYear() } TiPancarte. Tout droits réservés.</span>
        </footer>
    )
}

export default Footer
