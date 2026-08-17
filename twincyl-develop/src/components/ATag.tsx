import Link from "next/link";
import { MdOpenInNew } from "react-icons/md";

interface ATagProps {
    link: string;
    label: string;
}

export default function ATag({ link, label }: ATagProps) {
    return (
        <Link href={link} className="hover:text-fuchsia-700 text-blue-400 underline flex items-center">
            <MdOpenInNew />
            {label}
        </Link>
    )
}