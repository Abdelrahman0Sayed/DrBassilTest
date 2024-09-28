"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faGithub, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { useState, useEffect } from 'react';
import TranslationPair from "../Lib/Types";


export default () => {

    const [language, setLanguage] = useState<string>("ar");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedLanguage = localStorage.getItem("language") || "ar";
            const storedDir = localStorage.getItem("dir") || "rtl";
            const storedFont = localStorage.getItem("font") || "ArabicFont";

            setLanguage(storedLanguage);
            document.documentElement.dir = storedDir;
            document.body.className = storedFont;

            const handleCustomEvent = (event: Event) => {
                const customEvent = event as CustomEvent<{
                    language: string;
                    dir: string;
                    font: string;
                }>;
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

    const HomeTranslate: TranslationPair = {
        "ar": "الرئيسية",
        "en": "Home",
    }

    const AboutTranslate: TranslationPair = {
        "ar": "عن الدكتور",
        "en": "About",
    }

    const CoursesTranslate: TranslationPair = {
        "ar": "الدورات",
        "en": "Courses",
    }

    const BooksTranslate: TranslationPair = {
        "ar": "الكتب",
        "en": "Books",
    }

    const ArticlesTranslate: TranslationPair = {
        "ar": "المقالات",
        "en": "Articles",
    }

    const FooterTitle: TranslationPair = {
        "en": "Dr. Bassel Tawfik",
        "ar": "د. باسل توفيق",
    }

    const FooterDescription: TranslationPair = {
        "en": "Explore Dr. Bassel Tawfik's site for valuable lectures, books, and articles. Enhance your knowledge and stay current with the latest insights in Biomedical Engineering.",
        "ar": "استكشف موقع د. باسل توفيق للمحاضرات والكتب والمقالات القيمة. قم بتعزيز معرفتك وابق على اطلاع على أحدث الرؤى في الهندسة الطبية.",
    }
    

    const FooterCopyright: TranslationPair = {
        "en": " 2024 Dr. Bassel Tawfik All rights reserved.",
        "ar": " 2024 د. باسل توفيق جميع الحقوق محفوظة.",
    }

    const MadebyTranslation: TranslationPair = {
        "en": "Made By: ",
        "ar": "صنع بواسطة: ",
    }

    const MadebyName1: TranslationPair = {
        "en": "Abdelrahman Sayed",
        "ar": "عبدالرحمن سيد",
    }

    const MadebyName2: TranslationPair = {
        "en": "Kareem Abdel Nabi",
        "ar": "كريم عبدالنبي",
    }

    const MadebyName3: TranslationPair = {
        "en": "Salah Muhammed",
        "ar": "صلاح محمد",
    }

    const footerNavs = [
        {
            href: '',
            name: HomeTranslate[language]
        },
        {
            href: '',
            name: AboutTranslate[language]
        },
        {
            href: '',
            name: CoursesTranslate[language]
        },
        {
            href: '',
            name: BooksTranslate[language]
        },
        {
            href: '',
            name: ArticlesTranslate[language]
        },
    ]

    const contributors = [
        {
            name: MadebyName1[language],
            href: ''
        },
        {
            name: MadebyName2[language],
            href: ''
        },
        {
            name: MadebyName3[language],
            href: ''
        }
    ]

    return (
        <footer className="border-t border-black dark:border-white text-[#03045e] dark:text-[#6EACDA] bg-[#EEEEEE] dark:bg-[#021526] px-4 py-5 w-full mx-auto md:px-8">
            <div className="max-w-lg sm:mx-auto sm:text-center">
                <h2 className="text-2xl font-bold text-[#03045e] dark:text-[#6EACDA]">
                    {FooterTitle[language]}
                </h2>
                <p className="leading-relaxed text-[15px] mt-5 text-[#03045e] dark:text-[#6EACDA]">
                    {FooterDescription[language]}
                </p>
            </div>

            <div className="mt-8 md:flex md:flex-row md:items-center md:justify-between flex flex-col items-center gap-1 md:gap-0">
                <div className="md:text-xl mt-4 sm:mt-0 text-[#03045e] dark:text-[#6EACDA] text-center">
                    &copy; {FooterCopyright[language]}
                </div>
                <div className="mt-6 sm:mt-0">
                    <ul className="md:text-lg flex items-center gap-5 text-[#03045e] dark:text-[#6EACDA]">
                        <li className="w-10 h-10 border border-black dark:border-white rounded-full flex items-center justify-center">
                            <a href="">
                                <FontAwesomeIcon icon={faLinkedinIn} className=" hover:text-[#3b4bb0] dark:hover:text-sky-400" />
                            </a>
                        </li>

                        <li className="w-10 h-10 border border-black dark:border-white rounded-full flex items-center justify-center">
                            <a href="">
                                <FontAwesomeIcon icon={faGithub} className=" hover:text-[#3b4bb0] dark:hover:text-sky-400" />
                            </a>
                        </li>

                        <li className="w-10 h-10 border border-black dark:border-white rounded-full flex items-center justify-center">
                            <a href="">
                                <FontAwesomeIcon icon={faFacebookF} className=" hover:text-[#3b4bb0] dark:hover:text-sky-400" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='mt-8 flex flex-col items-center w-full text-center'>
                <h1 className='text-2xl font-bold text-[#03045e] dark:text-[#6EACDA]'>
                    {MadebyTranslation[language]}
                </h1>
                <ul className={`${language === "en" ? "flex flex-col items-center gap-3 md:flex md:flex-row md:justify-between mt-3 md:gap-0 md:items-baseline w-full md:mt-7 md:text-xl" : "flex flex-row w-full justify-between mt-3 md:mt-7 md:text-xl"}`}>
                    {
                        contributors.map((item, idx) => (
                            <li className="hover:text-[#3b4bb0] dark:hover:text-sky-400" key={idx}>
                                <a href={item.href}>
                                    { item.name }
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </footer>
    )
}
