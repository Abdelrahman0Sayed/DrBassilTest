"use client";

import { useState, useEffect } from "react";
import HomePage from "./Home/HomePage";
export default function About() {

    const [language, setLanguage] = useState<string>("ar");
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedTheme = localStorage.getItem("theme") || "dark";
            setIsDarkMode(storedTheme === "dark");
            document.documentElement.classList.toggle("dark", storedTheme === "dark");
        }
    }, [isDarkMode]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedLanguage = localStorage.getItem("language") || "ar";
            const storedDir = localStorage.getItem("dir") || "rtl";
            const storedFont = localStorage.getItem("font") || "ArabicFont";

            setLanguage(storedLanguage);
            document.documentElement.dir = storedDir;
            document.body.className = storedFont;

            const handleCustomEvent = (event: Event) => {
                const customEvent = event as CustomEvent<{ language: string; dir: string; font: string; }>;
                const { language, dir, font } = customEvent.detail;

                setTimeout(() => {
                    setLanguage(language);
                    document.documentElement.dir = dir;
                    document.body.className = font;
                }, 0);
            };

            window.addEventListener("languageChange", handleCustomEvent);

            return () => {
                window.removeEventListener("languageChange", handleCustomEvent);
            };
        }
    }, []);

    return (
        <div className="w-full flex justify-center min-h-screen text-[#03045e] dark:text-[#6EACDA] bg-[#EEEEEE] dark:bg-[#021526]">
            <HomePage />
        </div>
    );
}
