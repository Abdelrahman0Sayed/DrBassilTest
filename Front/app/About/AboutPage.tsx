"use client";

import { useState, useEffect } from "react";
import Header from "./Header";
import Experience from "./Experience";
import Skills from "./Skills";
import About from "./About";
import useThemeAndLanguage from "../CustomeHooks/useThemeAndLanguage";

export default function AboutPage() {

  const { language, isDarkMode, setIsDarkMode } = useThemeAndLanguage();

    return (
        <>
        <div className="w-full flex justify-center min-h-screen text-[#03045e] dark:text-[#6EACDA] bg-[#EEEEEE] dark:bg-[#021526]">
            <div className="w-[90%] flex flex-col gap-10">
                <Header />
                <div className="space-y-20 md:space-y-24">
                    <About />
                    <Experience />
                    <Skills />
                </div>

            </div>
        </div>
        </>
    )
}