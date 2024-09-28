"use client";

import { useState, useEffect } from "react";
import TranslationPair from "../Lib/Types";

export default function Contact() {
    const [language, setLanguage] = useState<string>("ar");
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedTheme = localStorage.getItem("theme") || "dark";
            setIsDarkMode(storedTheme === "dark");
            document.documentElement.classList.toggle("dark", storedTheme === "dark");
            document.body.className = storedTheme === "dark" ? "bg-[#021526]" : "bg-[#EEEEEE]";
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

    const FullName: TranslationPair = {
        ar: "الاسم الكامل",
        en: "Full Name"
    }

    const Email: TranslationPair = {
        ar: "البريد الإلكتروني",
        en: "Email"
    }

    const Phone: TranslationPair = {
        ar: "رقم الهاتف",
        en: "Phone"
    }

    const Message: TranslationPair = {
        ar: "رسالة",
        en: "Message"
    }

    const Send: TranslationPair = {
        ar: "إرسال",
        en: "Submit"
    }

    return (
        <>
            <div className="w-full flex justify-center">
                <div className="w-[90%] md:w-full">
                    <form  className="max-w-md mx-auto text-[#03045e] dark:text-[#6EACDA]">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="floating_full_name"
                                id="floating_full_name"
                                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-black dark:border-white appearance-none text-black dark:text-white dark:focus:border-[#6EACDA] focus:outline-none focus:ring-0 focus:border-[#03045e] peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="floating_full_name"
                                className="peer-focus:font-medium absolute text-sm text-black dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#03045e] peer-focus:dark:text-[#6EACDA] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                {language === "ar" ? FullName.ar : FullName.en}
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="email"
                                name="floating_email"
                                id="floating_email"
                                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-black dark:border-white appearance-none text-black dark:text-white dark:focus:border-[#6EACDA] focus:outline-none focus:ring-0 focus:border-[#03045e] peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="floating_email"
                                className="peer-focus:font-medium absolute text-sm text-black dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#03045e] peer-focus:dark:text-[#6EACDA] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                {language === "ar" ? Email.ar : Email.en}
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="tel"
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                name="floating_phone"
                                id="floating_phone"
                                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-black dark:border-white appearance-none text-black dark:text-white dark:focus:border-[#6EACDA] focus:outline-none focus:ring-0 focus:border-[#03045e] peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="floating_phone"
                                className="peer-focus:font-medium absolute text-sm text-black dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#03045e] peer-focus:dark:text-[#6EACDA] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                {language === "ar" ? Phone.ar : Phone.en}
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="floating_message"
                                id="floating_message"
                                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-black dark:border-white appearance-none text-black dark:text-white dark:focus:border-[#6EACDA] focus:outline-none focus:ring-0 focus:border-[#03045e] peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="floating_message"
                                className="peer-focus:font-medium absolute text-sm text-black dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#03045e] peer-focus:dark:text-[#6EACDA] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                {language === "ar" ? Message.ar : Message.en}
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="font-semibold mt-5 md:mt-10 text-white dark:text-black bg-[#03045e] hover:bg-[#030446] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-[#6EACDA] dark:hover:bg-[#65a6d8] dark:focus:ring-blue-800"
                        >
                            {language === "ar" ? Send.ar : Send.en}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
