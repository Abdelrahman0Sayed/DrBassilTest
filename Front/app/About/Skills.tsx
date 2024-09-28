"use client";

import { useState, useEffect } from "react";
import TranslationPair from "../Lib/Types";
import useThemeAndLanguage from "../CustomeHooks/useThemeAndLanguage";


export default function AboutPage() {

    const { language, isDarkMode, setIsDarkMode } = useThemeAndLanguage();

    const Skills: TranslationPair = {
        en: "Key Skills & Professional Capabilities",
        ar: "المهارات الرئيسية والقدرات المهنية"
    };

    const SkillsItems = [
        "Ultrasound",
        "Healthcare",
        "Medical Equipment Planning",
        "Image Processing",
        "Medical Imaging",
        "Biomedical Engineering",
        "Clinical Research",
        "Radiology",
        "Healthcare Information Technology (HIT)",
        "Medical Devices",
        "Hospitals",
        "Signal Processing",
    ];

    return (
        <div className="w-full flex justify-center text-[#03045e] dark:text-[#6EACDA] bg-[#EEEEEE] dark:bg-[#021526]">
            <div className="w-[90%] flex flex-col gap-10 p-3">
                <h1 className="text-2xl md:text-5xl">
                    {Skills[language]}
                </h1>
                <div className="w-full flex justify-center md:mt-5">
                  <div dir="ltr" className="w-full md:w-[70%] flex justify-center gap-5 flex-wrap">
                      {SkillsItems.map((skill, index) => (
                          <div key={index} className="py-2 px-4 text-center shadow-lg bg-white dark:bg-[#1E2A38] rounded-xl">
                              {skill}
                          </div>
                      ))}
                  </div>
                </div>
                <div className="h-20">

                </div>
            </div>
        </div>
    );
}
