"use client";

import { useState, useEffect } from "react";
import TranslationPair from "../Lib/Types";
import ProfileImg from "../Assets/Images/ProfileImg.png"; 
import CairoUniversityImg from "../Assets/Images/CairoUniversity.png";
import CaliforniaUniversityImg from "../Assets/Images/CaliforniaUniversity.png";
import useThemeAndLanguage from "../CustomeHooks/useThemeAndLanguage";


export default function Header() {

  const { language, isDarkMode, setIsDarkMode } = useThemeAndLanguage();


    const Name: TranslationPair = {
        en: "Bassel Tawfik",
        ar: "باسل توفيق"
    } 

    const Title: TranslationPair = {
        en: "Biomedical Engineering Professor & Healthcare technology management consultant",
        ar: "أستاذ هندسة الطب الحيوي واستشاري إدارة التكنولوجيا الصحية"
      }

    const Education: TranslationPair = {
        en: "Masters and PhD from University of Southern California",
        ar: "حاصل على درجة الماجستير والدكتوراه في جامعة جنوب كاليفورنيا"
    }

      const CairoUniversity: TranslationPair = {
        en: "Cairo University",
        ar: "جامعة القاهرة"
      }

      const CaliforniaUniversity: TranslationPair = {
        en: "University of southern California",
        ar: "جامعة جنوب كاليفورنيا"
      }

    return (
        <>
        <div className="w-full flex justify-center min-h-screen text-[#03045e] dark:text-[#6EACDA] bg-[#EEEEEE] dark:bg-[#021526]">
            <div className="w-[90%] flex flex-col gap-10 p-3 md:mt-40 mt-28">
                <div className="w-full gap-10 flex flex-col items-center md:flex md:flex-row md:justify-between">
                    <div className="w-full md:w-[50%] flex justify-center md:justify-normal">
                      <img src={ProfileImg.src} alt="Profile Image" className="w-[80%] rounded-xl" />
                    </div>
                    <div className="w-full md:w-[50%] flex flex-col gap-5 md:gap-10 items-center">
                        <h1 className="text-4xl md:text-7xl">
                            {Name[language]}
                        </h1>
                        <p className="text-slate-600 text-center dark:text-white text-lg md:text-2xl">
                            {Title[language]}
                        </p>
                        <p className="text-slate-600 text-center dark:text-white text-lg md:text-2xl">
                            {Education[language]}
                        </p>
                        <div className="w-full flex flex-col gap-5 items-center md:flex md:gap-0 md:flex-row md:justify-between md:items-center">
                          <div className="h-14 w-72 text-lg md:text-xl font-semibold text-white dark:text-black bg-[#03045e] dark:bg-[#6EACDA] px-6 py-2 rounded-lg flex justify-center items-center gap-3">
                            <img src={CairoUniversityImg.src} className="h-10" alt="" />
                            <span>{CairoUniversity[language]}</span>
                          </div>

                          <div className="h-14 w-72 text-lg md:text-xl font-semibold text-white dark:text-black bg-[#03045e] dark:bg-[#6EACDA] px-6 py-2 rounded-lg flex justify-center items-center gap-3">
                            <img src={CaliforniaUniversityImg.src} className="h-10" alt="" />
                            <span>{CaliforniaUniversity[language]}</span>
                          </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        </>
    )
}