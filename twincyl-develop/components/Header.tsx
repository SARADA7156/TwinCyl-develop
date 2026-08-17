import Image from "next/image";
import Link from "next/link";
import Nav from "./Nav";

export default function Header() {
    return (
        <header className="p-2 shadow-md shadow-fuchsia-700 bg-gray-950 fixed top-0 left-0 w-screen flex items-center">
            <Link href={"/"}>
                <Image
                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/TwinCylStudioLogoMini.png`}
                    alt="TwinCylStudioLogo"
                    width={150}
                    height={50}
                    className="h-auto w-32 lg:w-40"
                    loading="eager"
                />
            </Link>

            <Nav />
        </header>
    )
}