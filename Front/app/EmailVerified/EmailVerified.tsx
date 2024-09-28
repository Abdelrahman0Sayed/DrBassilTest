"use client"; 
import { useEffect, useState } from "react";
import TranslationPair from "../Lib/Types";
import EmailVerifiedDark from "../Assets/Images/EmailVerifiedDark.png";
import EmailVerifiedLight from "../Assets/Images/EmailVerifiedLight.png";
import { useRouter } from "next/router";
import { UserService } from "../Services/UserService";

export default function ActivateEmail() {
  const userService = new UserService()
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setToken(params.get('token'));
    setEmail(params.get('email'));
    console.log(params.get('token'));
    console.log(params.get('email'));
  }, []);

  useEffect(() => {
    if (token && email) {
      userService.confirmEmail(token, email).then((response) => {
        if (response.status === 200) {
          console.log(response)
        } else {
          console.log(response)
        }
      }).catch((error) => {
        console.log(error)
      });
    }
  }, [token, email]);
  
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

    const EmailVerified: TranslationPair = {
        en: "Your email has been verified successfully. You can now login to your account.",
        ar: "تم التحقق من بيلك الإلكتروني بنجاح. يمكنك الآن تسجيل الدخول إلى حسابك."
    }

    const Login: TranslationPair = {
        en: "Login Now",
        ar: "سجل الدخول الآن"
    }

    return(
        <>
        <div className="w-full flex justify-center">
            <div className="mt-32 w-[90%] md:w-[70%] min-h-screen text-[#03045e] dark:text-[#6EACDA] bg-[#EEEEEE] dark:bg-[#021526] flex flex-col items-center gap-10">
                <div className="flex flex-col items-center gap-3">
                    <h1 className="dark:text-white text-xl text-center md:text-3xl">
                        {EmailVerified[language]}
                    </h1>
                    <a href="/Login" className="dark:text-[#03045e] py-2 px-4 rounded-lg text-[#6EACDA] bg-black hover:bg-slate-800  dark:hover:bg-slate-200 dark:bg-white text-sm md:text-base">
                        {Login[language]}
                    </a>
                </div>

                <img src= {EmailVerifiedLight.src} alt="Sent Email" className="block dark:hidden w-3/4 md:w-1/2" />
                <img src= {EmailVerifiedDark.src} alt="Sent Email" className="hidden dark:block w-3/4 md:w-1/2" />
            </div>
        </div>
        </>
    )
}