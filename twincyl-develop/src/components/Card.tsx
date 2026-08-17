import ATag from "@/src/components/ATag";
import Text from "@/src/components/Text";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
    title: string;
    children: React.ReactNode;
    imageSrc: string;
    link?: string;
    linkLabel?: string;
}

export function Card({ title, children, imageSrc, link, linkLabel }: CardProps) {
    const validLink = link?.trim() ? link.trim() : null;

    const imageElement = (
        <Image
            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${imageSrc}`}
            alt={validLink ? "" : title}
            width={500}
            height={200}
            className="rounded-xl shadow-md w-full object-cover"
            loading="lazy"
        />
    );

    return (
        <div className="flex flex-col md:flex-row md:even:flex-row-reverse items-center gap-8 p-3">
            {/* 画像エリア */}
            <div className="w-full md:w-1/2">
                {validLink ? (
                    <Link href={validLink} className="block w-full">
                        {imageElement}
                    </Link>
                ) : (
                    imageElement
                )}
            </div>

            {/* テキストエリア */}
            <div className="w-full md:w-1/2 space-y-4">
                <Text as="h2" className="text-2xl font-bold">{title}</Text>
                {children}

                {/* link と linkLabel がある場合のみ ATag を内包してレンダリング */}
                {validLink && linkLabel && (
                    <div className="pt-2">
                        <ATag link={validLink} label={linkLabel} />
                    </div>
                )}
            </div>
        </div>
    );
}