"use client"; 
import { useEffect, useState } from "react";
import TranslationPair from "../Lib/Types";
import OtpDark from "../Assets/Images/OtpDark.png";
import OtpLight from "../Assets/Images/OtpLight.png";
import VerificationInput from "./VerificationInput";
import { UserService } from "../Services/UserService";

export default function OTP() {

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

    const OTPText: TranslationPair = {
        en: "We have sent you an email with a verification code. Please check your email.",
        ar: "لقد أرسلنا لك بريدًا إلكترونيًا برمز التحقق. يرجى التحقق من بريدك الإلكتروني.",
    }

    const DontGetOTP: TranslationPair = {
        en: "Didn't get the OTP?",
        ar: "لم تحصل على رمز التحقق؟",
    }

    const Resend: TranslationPair = {
        en: "Resend",
        ar: "إعادة إرسال",
    }

    const handleSuccess = () => {
        console.log("Success");
    }

    const handleFail = () => {
        console.log("Fail");
    }
    const userService = new UserService();
    if(userService.isAuthenicated()){
      window.location.href = '/'
      return;
    }
    return(
        <>
        <div className="w-full flex justify-center">
            <div className="mt-32 md:mt-40 w-[90%] min-h-screen text-[#03045e] dark:text-[#6EACDA] bg-[#EEEEEE] dark:bg-[#021526] flex flex-col items-center gap-10 md:flex md:flex-row md:justify-between md:items-start md:gap-0">
                <div className="flex flex-col gap-5 items-center">
                    <h1 className="md:mt-28 text-xl text-center md:text-3xl">
                        {OTPText[language]}
                    </h1>
                    <div className="flex gap-5 justify-center">
                        <p className="text-sm md:text-base">{DontGetOTP[language]}</p>
                        <button className="text-sm md:text-base underline ">{Resend[language]}</button>
                    </div>
                    <div className="md:mt-10">
                        <VerificationInput  onCorrect={handleSuccess} onFail={handleFail} />
                    </div>
                </div>

                <div className="w-full md:w-[60%] flex justify-center">
                   <img src= {OtpLight.src} alt="Sent Email" className="block dark:hidden w-3/4 " />
                   <img src= {OtpDark.src} alt="Sent Email" className="hidden dark:block w-3/4" />
                </div>

            </div>
        </div>
        </>
    )
}