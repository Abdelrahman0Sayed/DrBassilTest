"use client"; 
import { useEffect, useState } from "react";
import TranslationPair from "../Lib/Types";
import ResetPasswordDark from "../Assets/Images/ResetPasswordDark.png";
import ResetPasswordLight from "../Assets/Images/ResetPasswordLight.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function EnterEmail() {
    const [language, setLanguage] = useState<string>("ar");
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);

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
    };

    const PasswordPlaceholder: TranslationPair = {
        en: "Enter Your Password",
        ar: "ادخل كلمة المرور"
    };

    const Password: TranslationPair = {
        en: "Password",
        ar: "كلمة المرور"
    };

    const ConfirmPassword: TranslationPair = {
        en: "Confirm Password",
        ar: "تأكيد كلمة المرور"
    };

    const ConfirmPasswordPlaceholder: TranslationPair = {
        en: "Confirm Your Password",
        ar: "تأكيد كلمة المرور"
    };

    const Submit: TranslationPair = {
        en: "Reset Password",
        ar: "إعادة تعيين "
    };

    return (
        <>
            <div className="w-full flex justify-center">
                <div className="mt-32 md:mt-40 w-[90%] min-h-screen text-[#03045e] dark:text-[#6EACDA] bg-[#EEEEEE] dark:bg-[#021526] flex flex-col items-center gap-10 md:flex md:flex-row md:justify-between md:items-start md:gap-0">
                    <div className="flex flex-col gap-5 items-center">
                        <h1 className="md:mt-10 text-xl text-center md:text-3xl">
                            {ResetPassword[language]}
                        </h1>
                        <form action="" className="mt-10 flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="password" className="text-xl md:text-2xl">
                                    {Password[language]}
                                </label>
                                <div className="relative">
                                    <input
                                        type={passwordVisible ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        placeholder={PasswordPlaceholder[language]}
                                        className={`w-[300px] md:w-[400px] p-2 rounded-lg outline-none bg-[#03045e] dark:bg-white text-white dark:text-black placeholder:text-slate-200 dark:placeholder:text-slate-500`}
                                    />
                                    <FontAwesomeIcon
                                        icon={passwordVisible ? faEyeSlash : faEye}
                                        onClick={() => setPasswordVisible(!passwordVisible)}
                                        className={`absolute top-3 ${language === "ar" ? "left-3" : "right-3"} text-white dark:text-gray-500 cursor-pointer`}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="confirmpassword" className="text-xl md:text-2xl">
                                    {ConfirmPassword[language]}
                                </label>
                                <div className="relative">
                                    <input
                                        type={confirmPasswordVisible ? "text" : "password"}
                                        name="confirmpassword"
                                        id="confirmpassword"
                                        placeholder={ConfirmPasswordPlaceholder[language]}
                                        className={`w-[300px] md:w-[400px] p-2 rounded-lg outline-none bg-[#03045e] dark:bg-white text-white dark:text-black placeholder:text-slate-200 dark:placeholder:text-slate-500`}
                                    />
                                    <FontAwesomeIcon
                                        icon={confirmPasswordVisible ? faEyeSlash : faEye}
                                        onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                        className={`absolute top-3 ${language === "ar" ? "left-3" : "right-3"} text-white dark:text-gray-500 cursor-pointer`}
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
                        <img src={ResetPasswordLight.src} alt="Sent Email" className="block dark:hidden w-3/4" />
                        <img src={ResetPasswordDark.src} alt="Sent Email" className="hidden dark:block w-3/4" />
                    </div>
                </div>
            </div>
        </>
    );
}
