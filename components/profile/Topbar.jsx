import Link from 'next/link';
import dynamic from 'next/dynamic'

function Topbar({links, actual}) {
    return (
        <>
            <div className="border-b border-gray-100 bg-slate-50">
                <ul className="flex flex-wrap gap-x-6 justify-center items-center m-0 py-2">
                    {links.map((item, i) => (
                        <li className="m-0" key={i}>
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

export default dynamic(() => Promise.resolve(Topbar), { ssr: false })
