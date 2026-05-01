import Navbar from "../../components/Shared/Navbar/Navbar";


export default function CommonLayout({
    children,
}: Readonly<{
    children: React.ReactNode;

}>) {
    return (
        <div>
            <Navbar/>

            <main className="max-w-[1440px] mx-auto mt-4">
                {children}
            </main>

        </div>
    )
}
