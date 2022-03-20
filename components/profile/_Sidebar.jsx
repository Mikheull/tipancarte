import Link from 'next/link';
import dynamic from 'next/dynamic'

function Sidebar({links, actual}) {
    return (
        <>
            <div className="border-b border-gray-100 ">
                <ul className="flex flex-wrap gap-x-6">
                    {links.map((item, i) => (
                        <li className="" key={i}>
                            <Link href={item.link} passHref>
                                <a className={`text-black ${(actual == item.key) ? 'font-bold' : 'font-normal'}`}>{item.name}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default dynamic(() => Promise.resolve(Sidebar), { ssr: false })
