import Head from "next/head";
import { FC } from "react";
import { MainLayoutProps } from "./mainLayout.types";


const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    return (
        <>
            <Head>
                <title>Needed That Data UI</title>
                <meta name="description" content="UI for Needed that Data App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="w-full min-h-screen bg-slate-100">
                {children}                
            </div>
        </>
    );
}

export default MainLayout;