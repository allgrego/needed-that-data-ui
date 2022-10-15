import Head from "next/head";
import { FC } from "react";
import { MainLayoutProps } from "./mainLayout.types";


const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    return (
        <>
            <Head>
                <title>Needed That Data App</title>
                <meta name="description" content="Needed that Data App" />
                <link rel="icon" href="/favicon_ntd.ico" />
            </Head>
            <div className="w-full min-h-screen bg-slate-100">
                {children}                
            </div>
        </>
    );
}

export default MainLayout;