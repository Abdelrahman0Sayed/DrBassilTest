"use client";

import TranslationPair from "../Lib/Types";
import useThemeAndLanguage from "../CustomeHooks/useThemeAndLanguage";
import BGDark from "../Assets/Images/BG2.jpg";
import BGLight from "../Assets/Images/BG4.jpg";
import { useEffect, useState } from "react";
import { UserService } from "../Services/UserService";

export default function Header() {

    const { language } = useThemeAndLanguage();

    const Welcome: TranslationPair = {
        en: "Welcome to Dr. Bassel's Website",
        ar: "مرحبا بكم في موقع الدكتور باسل"
    };

    const WebsiteDesc: TranslationPair = {
        en: "Discover more information about Dr. Bassel, including access to his courses, books, and articles. You can also get in touch with him.",
        ar: "اكتشف المزيد من المعلومات حول الدكتور باسل، بما في ذلك الوصول إلى دوراته وكتبه ومقالاته. يمكنك أيضًا التواصل معه."
    };

    const Register: TranslationPair = {
        en: "Register",
        ar: "تسجيل"
    };

    const Login: TranslationPair = {
        en: "Contact",
        ar: "تواصل"
    };
    const userService = new UserService();
    return (
        <>
        <div
            className="hidden dark:block relative w-full h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${BGDark.src})` }}
        >
            <div className="absolute inset-0 bg-black w-full h-screen bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
                <section className="py-14 max-w-screen-xl mx-auto px-4 md:text-center md:px-8">
                    <div className="max-w-xl md:mx-auto">
                        <h3 className="text-white text-3xl font-semibold sm:text-4xl">
                            {Welcome[language]}
                        </h3>
                        <p className="mt-5 text-white md:text-lg">
                            {WebsiteDesc[language]}
                        </p>
                    </div>
                    <div className="flex gap-3 items-center mt-4 md:justify-center">
                        <a href="/Signup" className="w-36 inline-block py-2 px-4 text-white font-medium bg-black duration-150 hover:bg-slate-900 active:bg-slate-900 rounded-lg shadow-md hover:shadow-none">
                            {Register[language]}
                        </a>
                        <a href="/Contact" className="w-36 bg-white inline-block py-2 px-4 text-black font-medium duration-150 hover:bg-slate-200 active:bg-gray-100 rounded-lg">
                            {Login[language]}
                        </a>
                    </div>
                </section>
            </div>
        </div>

        <div
            className="block dark:hidden relative w-full h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${BGLight.src})` }}
        >
            <div className="absolute inset-0 bg-black w-full h-screen bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
                <section className="py-14 max-w-screen-xl mx-auto px-4 md:text-center md:px-8">
                    <div className="max-w-xl md:mx-auto">
                        <h3 className="text-white text-3xl font-semibold sm:text-4xl">
                            {Welcome[language]}
                        </h3>
                        <p className="mt-5 text-white md:text-lg">
                            {WebsiteDesc[language]}
                        </p>
                    </div>
                    {
                    !userService.isAuthenicated() && (
                        <div className="flex gap-3 items-center mt-4 md:justify-center">
                        <a href="/Signup" className="w-36 inline-block py-2 px-4 text-white font-medium bg-[#03045e] duration-150 hover:bg-[#050780] active:bg-slate-900 rounded-lg shadow-md hover:shadow-none">
                            {Register[language]}
                        </a>
                        <a href="/Contact" className="w-36 bg-white inline-block py-2 px-4 text-black font-medium duration-150 hover:bg-slate-200 active:bg-gray-100 rounded-lg">
                            {Login[language]}
                        </a>
                    </div>
                    )}
                </section>
            </div>
        </div>

    </> 
    );
}
