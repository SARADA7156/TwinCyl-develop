'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";
import { MdMoreVert } from "react-icons/md";

const NAV_DATA = [
    { label: "ホーム", link: "" },
    { label: "お知らせ", link: "notice" },
    { label: "ブログ", link: "blog" },
    { label: "技術記事", link: "technical_articles" },
    { label: "アップデート情報", link: "updates" },
    { label: "インフォメーション", link: "information" },
];

export default function Nav() {
    const location = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const toggle = (e: MouseEvent) => {
        e.stopPropagation();
        setIsOpen((prev) => !prev);
    }

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <>
            <nav className={`flex z-40 lg:ms-8 w-screen`}>
                <ul className={`
                        ${isOpen ? "flex" : "hidden"} w-screen
                        bg-gray-950 flex-col fixed top-16.25 left-0
                        lg:static lg:flex lg:flex-row lg:text-xl lg:w-auto
                    `}>
                    {NAV_DATA.map((data, i) => (
                        <li key={`nav-content-${i}`}>
                            <Link href={`/${data.link}`} className="p-2 active:text-fuchsia-500 hover:text-fuchsia-500" >{data.label}</Link>
                        </li>
                    ))}
                </ul>

                <button
                    type="button"
                    onClick={(e) => toggle(e)}
                    className="z-50 ms-auto rounded-md p-3 lg:hidden"
                >
                    <MdMoreVert className="text-xl" />
                </button>

                <div
                    className={`${isOpen ? "fixed" : "hidden"} -z-1 w-screen h-screen top-0 left-0 lg:hidden`}
                    onClick={(e) => toggle(e)}
                >
                </div>
            </nav>
        </>
    )
}