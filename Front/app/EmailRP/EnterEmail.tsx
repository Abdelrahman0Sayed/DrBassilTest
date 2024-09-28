"use client"; 
import { useEffect, useState } from "react";
import TranslationPair from "../Lib/Types";
import EnterEmailDark from "../Assets/Images/EnterEmailDark.png";
import EnterEmailLight from "../Assets/Images/EnterEmailLight.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function EnterEmail() {

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

    const ResetPassword: TranslationPair = {
        en: "Reset Password",
        ar: "إعادة تعيين كلمة المرور",
    }

    const Email: TranslationPair = {
        en: "Email",
        ar: "البريد الالكتروني"
    };

    const EmailPlaceholder: TranslationPair = {
        en: "Enter Your Email",
        ar: "ادخل بريدك الالكتروني"
    };

    const Submit: TranslationPair = {
        en: "Submit",
        ar: "إرسال"
    }

    const ResetPasswordText: TranslationPair = {
        en: "Enter your email address and we will send you a link to reset your password",
        ar: "ادخل بريدك الالكتروني وسنرسل لك رابط لإعادة تعيين كلمة المرور"
    }


    return(
        <>
        <div className="w-full flex justify-center">
            <div className="mt-32 md:mt-40 w-[90%] min-h-screen text-[#03045e] dark:text-[#6EACDA] bg-[#EEEEEE] dark:bg-[#021526] flex flex-col items-center gap-10 md:flex md:flex-row md:justify-between md:items-start md:gap-0">
                <div className="flex flex-col gap-5 items-center">
                    <h1 className="md:mt-20 text-xl text-center md:text-3xl">
                        {ResetPassword[language]}
                    </h1>
                    <p className="dark:text-white w-full md:w-[70%] text-center text-sm md:text-lg">
                        {ResetPasswordText[language]}
                    </p>
                    <form action="" className="flex flex-col gap-5">
                        <div className="mt-5 flex flex-col gap-2">
                            <label htmlFor="email" className="text-xl md:text-2xl">
                                {Email[language]}
                            </label>
                            <div className="relative">
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className={`absolute top-3 ${language === "ar" ? "right-3" : "left-3"} text-white dark:text-gray-500`}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder={EmailPlaceholder[language]}
                                    className={`w-[300px] md:w-[400px] p-2 ${
                                        language === "ar" ? "pr-10" : "pl-10"
                                    } rounded-lg outline-none bg-[#03045e] dark:bg-white text-white dark:text-black placeholder:text-slate-200 dark:placeholder:text-slate-500`}
                                />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button className="mt-10 font-semibold bg-[#03045e] dark:bg-white hover:bg-[#030447] dark:hover:bg-slate-200 text-white dark:text-black p-2 rounded-lg w-[200px] md:w-[300px]">
                                {Submit[language]}
                            </button>
                        </div>

                    </form>

                </div>

                <div className="w-full md:w-[50%] flex justify-center">
                   <img src= {EnterEmailLight.src} alt="Sent Email" className="block dark:hidden w-3/4 " />
                   <img src= {EnterEmailDark.src} alt="Sent Email" className="hidden dark:block w-3/4" />
                </div>

            </div>
        </div>
        </>
    )
}