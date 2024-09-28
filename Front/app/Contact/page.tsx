"use client";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Contact from "./Contact";
import "../globals.css";

export default function Home() {

    return (
        <>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center w-full bg-[#EEEEEE] dark:bg-[#021526]">
            <Contact />
        </div>
        <Footer />
        </>

    );
}
