import { H1 } from "@/src/components/H1";

interface SectionLayoutProps {
    children: React.ReactNode
    title: string;
}

export default function SectionLayout({ children, title }: SectionLayoutProps) {
    return (
        <>
            <H1 center>{title}</H1>
            <div className="bg-[#222222] shadow-[0_0_4px] shadow-fuchsia-700 p-3 mt-5 mb-10">
                {children}
            </div>
        </>
    );
}