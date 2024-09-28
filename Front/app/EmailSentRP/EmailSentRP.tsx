"use client"; 
import { useEffect, useState } from "react";
import TranslationPair from "../Lib/Types";
import SentEmailDarkImg from "../Assets/Images/SentEmailDark.png";
import SentEmailLightImg from "../Assets/Images/SentEmailLight.png";

export default function ActivateEmail() {

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

    const EmailSent: TranslationPair = {
        en: "We have sent you an email with a reset password link. Please check your email.",
        ar: "لقد أرسلنا لك بريدًا إلكترونيًا برابط إعادة تعيين كلمة المرور. يرجى التحقق من بريدك الإلكتروني.",
    }

    return(
        <>
        <div className="w-full flex justify-center">
            <div className="mt-32 w-[90%] md:w-[70%] min-h-screen text-[#03045e] dark:text-[#6EACDA] bg-[#EEEEEE] dark:bg-[#021526] flex flex-col items-center gap-10">
                <h1 className="dark:text-white text-xl text-center md:text-3xl">
                    {EmailSent[language]}
                </h1>
                <img src= {SentEmailLightImg.src} alt="Sent Email" className="block dark:hidden w-3/4 md:w-1/2" />
                <img src= {SentEmailDarkImg.src} alt="Sent Email" className="hidden dark:block w-3/4 md:w-1/2" />
            </div>
        </div>
        </>
    )
}