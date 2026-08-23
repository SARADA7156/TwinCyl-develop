import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
    isOpen: boolean;
}

export default function Header({ isOpen }: HeaderProps) {
    return (
        <header className={`
            ${isOpen ? "left-60" : "left-16"}
            p-2 shadow-md shadow-fuchsia-700 bg-[#000000] fixed top-0 w-screen h-16 flex items-center
        `}>
            <Link href={"/"} className="flex">
                <Image
                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/TwinCylStudioLogoMini.png`}
                    alt="TwinCylStudioLogo"
                    width={150}
                    height={50}
                    className="h-auto w-32 lg:w-40"
                    loading="eager"
                />
                <h1 className="text-3xl font-bold ms-2">develop</h1>
            </Link>
        </header>
    )
}