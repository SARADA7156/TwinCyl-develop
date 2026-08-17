import ATag from "@/src/components/ATag";
import Text from "@/src/components/Text";

interface TextCardProps {
    title: string;
    children: React.ReactNode;
    link?: string;
    linkLabel?: string;
}

export function TextCard({ title, children, link, linkLabel }: TextCardProps) {
    const validLink = link?.trim() ? link.trim() : null;

    return (
        <div className="flex flex-col md:flex-row items-center gap-8 p-3">
            {/* テキストエリア */}
            <div className="w-full space-y-4">
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