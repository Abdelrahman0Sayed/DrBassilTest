"use client";

import useThemeAndLanguage from "../CustomeHooks/useThemeAndLanguage";
import TranslationPair from "../Lib/Types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faBook, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import "../globals.css";

export default function Features ()  {

    const { language, isDarkMode, setIsDarkMode } = useThemeAndLanguage();

    const CoursesTranslations: TranslationPair = {
        en: "Courses",
        ar: "دورات"
    };
    
    const BooksTranslations: TranslationPair = {
        en: "Books",
        ar: "كتب"
    };

    const ArticlesTranslations: TranslationPair = {
        en: "Articles",
        ar: "مقالات"
    };

    const CoursesDescTranslation: TranslationPair = {
        en: "Enhance your expertise through a diverse range of courses in both biomedical sciences and Quran Miracles offered by Dr. Bassel.",
        ar: "قم بتعزيز خبرتك من خلال مجموعة متنوعة من الدورات في العلوم الطبية ومعجزات القرآن التي يقدمها الدكتور باسل."
    };

    const BooksDescTranslation: TranslationPair = {
        en: "Explore the world of medical equipment management and healthcare technology through Dr. Bassel's books.",
        ar: "استكشف عالم إدارة الأجهزة الطبية وتكنولوجيا الرعاية الصحية من خلال كتب الدكتور باسل."
    };

    const ArticlesDescTranslation: TranslationPair = {
        en: "Read insightful articles on healthcare technology management and Biomedical Engineering by Dr. Bassel.",
        ar: "اقرأ مقالات مفيدة حول إدارة تكنولوجيا الرعاية الصحية والهندسة الطبية التي يقدمها الدكتور باسل."};
    
    const HeadingTranslation: TranslationPair = {
        en: "You can start learning from :",
        ar: "يمكنك بدأ التعلم من خلال :"}

    const Button: TranslationPair = {
        en: "Explore",
        ar: "استكشف"}

    const features = [
        {
            icon: faPlay,
            title: CoursesTranslations[language],
            desc: CoursesDescTranslation[language],
            link: "/Courses"
        },
        {
            icon: faBook,
            title: BooksTranslations[language],
            desc: BooksDescTranslation[language],
            link: "/Books"
        },
        {
            icon: faNewspaper,
            title: ArticlesTranslations[language],
            desc: ArticlesDescTranslation[language],
            link: "/Articles"
        },   
    ]

    return (
        <section className="py-14">
            <div className="max-w-screen-xl mx-auto px-4 text-center text-[#03045e] dark:text-[#6EACDA] bg-[#EEEEEE] dark:bg-[#021526]">
                <div className="max-w-2xl mx-auto">
                    <h3 className="dark:text-white text-2xl font-semibold md:text-4xl">
                        {HeadingTranslation[language]}
                    </h3>
                </div>
                <div className="mt-12">
                    <ul className="grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
                        {
                            features.map((item, idx) => (
                                <li key={idx} className="space-y-5">
                                    <div className="flex items-center justify-center gap-4">
                                        <div className="w-12 h-12 bg-indigo-50 text-[#03045e] rounded-full flex items-center justify-center">
                                            <FontAwesomeIcon icon={item.icon} className="text-lg md:text-xl"/>
                                        </div>
                                        <h4 className="text-2xl dark:text-white font-semibold">
                                            {item.title}
                                        </h4>
                                    </div>
                                    <p >
                                        {item.desc}
                                    </p>
                                    <div className="flex justify-center">
                                        <button className="w-[90%] md:w-[50%] mt-5">
                                            <a href={item.link} className="flex justify-center items-center text-lg md:text-xl font-semibold text-white dark:text-black bg-[#03045e] dark:hover:bg-[#72b7eb] hover:bg-[#030446] dark:bg-[#6EACDA] p-1 rounded-lg button-container">
                                            {Button[language]} 
                                            </a>
                                        </button>
                                    </div>

                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}