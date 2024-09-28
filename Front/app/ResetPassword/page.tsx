"use client";

import Navbar from "../Components/Navbar";
import ResetPassword from "./ResetPassword";
import Footer from "../Components/Footer";

export default function Home() {
    return(
        <>
         <Navbar />
        <div className="min-h-screen w-full flex flex-col justify-center items-center dark:bg-[#021526] bg-[#EEEEEE]">
            <ResetPassword />
        </div>
        <Footer />
        </>
    )
}
