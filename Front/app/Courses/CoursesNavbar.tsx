"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import TranslationPair from "../Lib/Types";
import { useState, useEffect } from "react";

export default function CoursesNavbar(props: { onTabChange: (tabName: string) => void ,setSearchQuery: any ,searchQuery: string }) {
  const [language, setLanguage] = useState<string>("ar");
  const [activeTab, setActiveTab] = useState<string>("All");
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

  const SearchPlaceholder: TranslationPair = { en: "Search for a course", ar: "ابحث عن دورة" };
  const AllCourses: TranslationPair = { en: "All", ar: "الكل" };
  const EducationalCourses: TranslationPair = { en: "Educational", ar: "تعليمية" };
  const IslamicCourses: TranslationPair = { en: "Islamic", ar: "إسلامية" };

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    props.onTabChange(tabName);
  };

  return (
    <div className="text-[#03045e] dark:text-[#6EACDA] bg-[#EEEEEE] dark:bg-[#021526] border-[#03045e] border-b-2 dark:border-white w-full flex justify-center">
      <div className="w-[90%] md:w-[80%] flex flex-col gap-10 items-center justify-normal md:flex-row md:items-center md:justify-between px-10 py-5">
        <div className="w-full md:w-[50%] flex flex-row gap-10">
          <input
            value={props.searchQuery}
            onChange={(e) => props.setSearchQuery(e.target.value)}
            className="w-full md:w-[70%] rounded-xl bg-white text-black dark:outline-none outline-none py-2 pl-10 pr-4 placeholder:text-[#03045e] dark:placeholder:text-slate-500"
            placeholder={SearchPlaceholder[language]}
            type="search"
          />
          <button>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-2xl" />
          </button>
        </div>
        <div className="flex gap-10 text-xl md:text-2xl">
          <button onClick={() => handleTabClick("All")} className={`${activeTab === "All" ? "bg-[#03045e] text-white dark:bg-[#6EACDA] dark:text-black" : "text-[#03045e] dark:text-[#6EACDA]"} px-3 py-1 rounded-md`}>
            {AllCourses[language]}
          </button>
          <button onClick={() => handleTabClick("Educational")} className={`${activeTab === "Educational" ? "bg-[#03045e] text-white dark:bg-[#6EACDA] dark:text-black" : "text-[#03045e] dark:text-[#6EACDA]"} px-3 py-1 rounded-md`}>
            {EducationalCourses[language]}
          </button>
          <button onClick={() => handleTabClick("Islamic")} className={`${activeTab === "Islamic" ? "bg-[#03045e] text-white dark:bg-[#6EACDA] dark:text-black" : "text-[#03045e] dark:text-[#6EACDA]"} px-3 py-1 rounded-md`}>
            {IslamicCourses[language]}
          </button>
        </div>
      </div>
    </div>
  );
}
