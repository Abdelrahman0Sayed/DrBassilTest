"use client";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Header from "./Header";
import Features from "./Features";
import "../globals.css";

export default function Home() {

    return (
        <>
        <Navbar />
        <div className="min-h-screen flex flex-col  w-full bg-[#EEEEEE] dark:bg-[#021526]">
            <Header />
            <Features />
            <div className="h-20"></div>
            <Footer />
        </div>
        </>

    );
}
