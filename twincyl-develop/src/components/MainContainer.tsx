import { H1 } from "@/src/components/H1";

interface MainContainerProps {
    children: React.ReactNode
    title: string;
}

export default function MainContainer({ children, title }: MainContainerProps) {
    return (
        <>
            <H1>{title}</H1>
            {children}
        </>
    );
}