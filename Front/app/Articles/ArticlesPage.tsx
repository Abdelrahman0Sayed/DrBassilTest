"use client";

import { useState, useEffect } from "react";
import TranslationPair from "../Lib/Types";
import Articles from "./Articles";
export default function Courses() {

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
  
    const ArticlesTitle: TranslationPair = { en: "Articles", ar: "المقالات" };
    const ArticlesDescription: TranslationPair = { en: "Explore the valuable Articles delivered by Dr. Bassil and begin your learning journey today!", ar: "استكشف المقالات القيمة التي قدمها الدكتور باسل وابدأ رحلتك التعليمية اليوم!" };
  
  
    return (
      <div className="w-full flex justify-center min-h-screen text-[#03045e] dark:text-[#6EACDA] bg-[#EEEEEE] dark:bg-[#021526]">
        <div className="w-full flex flex-col items-center gap-10 md:gap-20 mt-32">
          <div className="flex flex-col items-center gap-10">
            <h1 className="text-3xl font-semibold md:text-5xl text-center">
              {ArticlesTitle[language]}
            </h1>
            <p className="text-xl md:text-2xl text-center">
              {ArticlesDescription[language]}
            </p>
          </div>
          <Articles />
          <div className="h-20 md:h-0">
          </div>
        </div>
      </div>
    );
}