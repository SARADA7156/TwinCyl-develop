import MainFlame from "./_components/MainFlame";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <MainFlame>
                {children}
            </MainFlame>
        </>
    )
}