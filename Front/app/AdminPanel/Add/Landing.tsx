"use client";

import { useEffect, useState } from "react";
import DarkImage from "../../Assets/Images/AddLandingDark2.png"
import LightImage from "../../Assets/Images/AddLandingLight2.png"

export default function Landing() {

    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
      if (typeof window !== "undefined") {
        const storedTheme = localStorage.getItem("theme") || "dark";
        setIsDarkMode(storedTheme === "dark");
        document.documentElement.classList.toggle("dark", storedTheme === "dark");
      }
    }, [isDarkMode]);

    return(
        <div className="flex justify-center ">
            <div className="w-[90%] flex flex-col md:flex md:flex-row items-center md:items-center md:justify-center gap-10 text-[#03045e] dark:text-[#6EACDA]">
                <div className="w-[80%] md:w-1/2 flex flex-col gap-3">
                    <p className="text-lg md:text-3xl">Please, choose what you want to add</p>
                </div>
                <div className="w-[70%] md:w-1/2">
                    <img src={DarkImage.src} alt="Admin Panel" className="w-full hidden dark:block"/>
                    <img src={LightImage.src} alt="Admin Panel" className="w-full block dark:hidden"/>
                </div>
            </div>
        </div>
    )
}