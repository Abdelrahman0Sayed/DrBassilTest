"use client";

import NotFoundDark from "./Assets/Images/404Dark.png";
import NotFoundLight from "./Assets/Images/404Light.png";
import TranslationPair from "./Lib/Types";
import useThemeAndLanguage from "./CustomeHooks/useThemeAndLanguage";

export default function NotFound() {

    const { language, isDarkMode } = useThemeAndLanguage();

    const Title: TranslationPair = {
        en: "Oops! Page not found",
        ar: "عذراً! الصفحة غير موجودة"
    }

    const Desc: TranslationPair = {
        en: "The page you are looking for might have been removed, had its name changed or is temporarily unavailable.",
        ar: "قد تمت إزالة الصفحة التي تبحث عنها أو تغيير اسمها أو أنها غير متاحة مؤقتًا."
    }

    const Home: TranslationPair = {
        en: "Go to Home",
        ar: "الذهاب إلى الصفحة الرئيسية"
    }

    return(
        <>
        <div className="min-h-screen w-full bg-[#EEEEEE] dark:bg-[#021526] text-[#03045e] dark:text-[#6EACDA] flex flex-col items-center justify-center ">
            <div className="w-full flex justify-center">
                <img src={NotFoundDark.src} alt="404" className="w-3/4 md:w-[30%] hidden dark:block" />
                <img src={NotFoundLight.src} alt="404" className="w-3/4 md:w-[30%] block dark:hidden" />
            </div>
            <h1 className="text-2xl md:text-5xl font-semibold my-4">{Title[language]}</h1>
            <p className="text-sm md:text-lg dark:text-white">{Desc[language]}</p>
            <a href="/"  className="mt-4 dark:text-[#03045e] py-2 px-4 rounded-lg text-[#6EACDA] bg-black hover:bg-slate-800  dark:hover:bg-slate-200 dark:bg-white">{Home[language]}</a>
        </div>
        </>
    )
}