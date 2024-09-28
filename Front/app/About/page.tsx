"use client";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import AboutPage from "./AboutPage";
import "../globals.css";

export default function Home() {

    return (
        <>
        <Navbar />
        <div className="min-h-screen w-full bg-[#EEEEEE] dark:bg-[#021526]">
            <AboutPage />
        </div>
        <Footer />
        </>

    );
}
