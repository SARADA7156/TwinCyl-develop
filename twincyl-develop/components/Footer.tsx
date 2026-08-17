import Image from "next/image";
import Link from "next/link";

interface FooterNavContent {
    label: string;
    href: string;
}

const FOOTER_CONTENT: FooterNavContent[] = [
    { label: "利用規約", href: "/pro-license" },
    { label: "オープンソースライセンス", href: "/licenses" },
    { label: "ステータス", href: "/status" },
    { label: "TwinCyl Studioについて", href: "/information" },
];

export default function Footer() {
    return (
        <footer className="w-full text-center bg-[#050505] p-2">
            <div className="w-2/4 ms-auto me-auto">
                <Image
                    src={"/TwinCylStudioLogoMini.png"}
                    alt="TwinCylStudioLogo"
                    width={150}
                    height={50}
                    className="h-auto w-32 lg:w-40 ms-auto me-auto"
                    loading="eager"
                />

                <div className="mt-4">
                    <ul className="text-sm text-center flex flex-col md:flex-row justify-center mt-2 text-[#c5c5c5]">
                        {FOOTER_CONTENT.map((content, index) => (
                            <li
                                className="ms-2 me-2 active:text-fuchsia-500 hover:text-fuchsia-500"
                                key={`footer-content-${index}`}
                            >
                                <Link className="pt-1" href={content.href}>{content.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <small className="text-[#747474]">&copy; 2026 TwinCyl Studio</small>
        </footer>
    );
}