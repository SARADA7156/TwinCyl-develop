import Link from "next/link";
import { MdAddAlert, MdArticle, MdBuild, MdDashboard, MdHealthAndSafety, MdMenu, MdNotifications, MdShowChart } from "react-icons/md";

const NAV_DATA = [
    { label: "ダッシュボード", link: "dashboard", icon: MdDashboard },
    { label: "通知", link: "notice", icon: MdNotifications },
    { label: "ブログを作成", link: "create_blog", icon: MdArticle },
    { label: "ブログを管理", link: "manage_blog", icon: MdBuild },
    { label: "お知らせを追加", link: "add_notice", icon: MdAddAlert },
    { label: "メトリクス", link: "metrics", icon: MdShowChart },
    { label: "診断", likn: "health", icon: MdHealthAndSafety }
];

interface NavProps {
    isOpen: boolean;
    toggle: () => void;
}

export default function Nav({ isOpen, toggle }: NavProps) {
    return (
        <>
            <nav className={`flex z-40 flex-col bg-[#000000] h-full fixed top-0 left-0 ${isOpen ? "w-60" : "w-16"}`}>
                <button
                    type="button"
                    className="p-2 cursor-pointer hover:text-fuchsia-500"
                    title={`${isOpen ? "サイドバーを閉じる" : "サイドバーを開く"}`}
                    onClick={toggle}
                >
                    <MdMenu className="text-4xl" />
                </button>

                <div>
                    <ul className="flex flex-col">
                        {NAV_DATA.map((data, i) => {
                            const Icon = data.icon;
                            return (
                                <li key={`nav-content-${i}`} className="text-xl ps-2">
                                    <Link
                                        href={`/${data.link}`}
                                        className="active:text-fuchsia-500 hover:text-fuchsia-500 flex items-center m-1 h-9"
                                        title={data.label}
                                    >
                                        <Icon />
                                        <span className={`${isOpen ? "block" : "hidden"} ms-2`}>
                                            {data.label}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>
        </>
    )
}