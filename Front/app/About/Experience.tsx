"use client";

import { useState, useEffect } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import TranslationPair from "../Lib/Types";
import useThemeAndLanguage from "../CustomeHooks/useThemeAndLanguage";


const Timeline = () => {

  const { language, isDarkMode, setIsDarkMode } = useThemeAndLanguage();


  const ThirdTimeLineTitle: TranslationPair = {
    en: "Professor & Consultant, Cairo University",
    ar: "أستاذ واستشاري، جامعة القاهرة",
  };
  const ThirdTimeLineDescription: TranslationPair = {
    en: "Part-time position at Cairo University, contributing to the academic and administrative growth.",
    ar: "منصب جزئي في جامعة القاهرة، يساهم في النمو الأكاديمي والإداري.",
  };
  const ThirdTimeLineTime: TranslationPair = {
    en: "Jun 1988 - Present",
    ar: "يونيو 1988 - حتى الآن",
  };

  const SecondTimeLineTitle: TranslationPair = {
    en: "Professor and Ex-Department Head, Cairo University",
    ar: "أستاذ ورئيس قسم سابق بجامعة القاهرة",
  };
  const SecondTimeLineDescription: TranslationPair = {
    en: "Led the department, managed faculty, and developed curriculum.",
    ar: "قاد القسم، وأدار الكلية، وطوّر المنهج الدراسي.",
  };
  const SecondTimeLineTime: TranslationPair = {
    en: "2007 - 2011 · 4 years",
    ar: "2007 - 2011 · 4 سنوات",
  };

  const FirstTimeLineTitle: TranslationPair = {
    en: "Associate Professor, Cairo University",
    ar: "أستاذ مشارك، جامعة القاهرة",
  };
  const FirstTimeLineDescription: TranslationPair = {
    en: "Taught undergraduate and postgraduate courses, supervised research projects.",
    ar: "درّس مقررات البكالوريوس والدراسات العليا، وأشرف على المشاريع البحثية.",
  };
  const FirstTimeLineTime: TranslationPair = {
    en: "1996 - 2001 · 5 years",
    ar: "1996 - 2001 · 5 سنوات",
  };

  const Experience: TranslationPair = {
    en: "Experience",
    ar: "الخبرات",
  };

  return (
    <div className="w-full flex justify-center text-[#03045e] dark:text-[#6EACDA] bg-[#EEEEEE] dark:bg-[#021526]">

      <div className="w-[90%] flex flex-col p-2 gap-10">
        <h1 className="text-2xl md:text-5xl">
            {Experience[language]}
        </h1>

        <ol className="flex flex-col sm:flex-row w-full justify-between">
          {/* First Timeline Item */}
          <li className="relative mb-6 sm:mb-0 flex-1">
            <div className="flex items-center">
              <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                <FontAwesomeIcon icon={faCalendar} className="text-sm" />
              </div>
              <div className="hidden sm:flex w-full bg-black h-0.5 dark:bg-gray-700"></div>
            </div>
            <div className="mt-3 sm:pe-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {language === "ar" ? FirstTimeLineTitle.ar : FirstTimeLineTitle.en}
              </h3>
              <time className="mt-3 block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {language === "ar" ? FirstTimeLineTime.ar : FirstTimeLineTime.en}
              </time>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                {language === "ar" ? FirstTimeLineDescription.ar : FirstTimeLineDescription.en}
              </p>
            </div>
          </li>

          {/* Second Timeline Item */}
          <li className="relative mb-6 sm:mb-0 flex-1">
            <div className="flex items-center">
              <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                <FontAwesomeIcon icon={faCalendar} className="text-sm" />
              </div>
              <div className="hidden sm:flex w-full bg-black  h-0.5 dark:bg-gray-700"></div>
            </div>
            <div className="mt-3 sm:pe-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {language === "ar" ? SecondTimeLineTitle.ar : SecondTimeLineTitle.en}
              </h3>
              <time className="mt-3 block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {language === "ar" ? SecondTimeLineTime.ar : SecondTimeLineTime.en}
              </time>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                {language === "ar" ? SecondTimeLineDescription.ar : SecondTimeLineDescription.en}
              </p>
            </div>
          </li>

          {/* Third Timeline Item */}
          <li className="relative mb-6 sm:mb-0 flex-1">
            <div className="flex items-center">
              <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                <FontAwesomeIcon icon={faCalendar} className="text-sm" />
              </div>
              <div className="hidden sm:flex w-full bg-black  h-0.5 dark:bg-gray-700"></div>
            </div>
            <div className="mt-3 sm:pe-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {language === "ar" ? ThirdTimeLineTitle.ar : ThirdTimeLineTitle.en}
              </h3>
              <time className="mt-3 block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {language === "ar" ? ThirdTimeLineTime.ar : ThirdTimeLineTime.en}
              </time>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                {language === "ar" ? ThirdTimeLineDescription.ar : ThirdTimeLineDescription.en}
              </p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Timeline;
