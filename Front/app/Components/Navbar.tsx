'use client';
import { useEffect, useState } from "react";
import "../globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faEarthAfrica, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import UserLightImg from "../Assets/Images/UserLight.png";
import UserDarkImg from "../Assets/Images/UserDark.png";
import Link from "next/link";
import { UserService } from "../Services/UserService";

export default function Navbar() {
  const userService = new UserService();
  const [nav, setNav] = useState(false);
  const [language, setLanguage] = useState<string>("ar");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

  
  const toggleTexts: { [key: string]: { [key: string]: string } } = {
    darkMode: {
      ar: "المظهر",
      en: "Theme",
    },
    lightMode: {
      ar: "المظهر",
      en: "Theme",
    },
  };

  const popoverMessage1: { [key: string]: string } = {
    ar: "أنت لست مستخدمًا، يرجى تسجيل الدخول أو التسجيل.",
    en: "You are not a user, please login or signup.",
  };
  const popoverMessageAuth: { [key: string]: string } = {
    ar: `مرحبا بك ${userService.getName()}`,
    en: `Welcome ${userService.getName()}`,
  };

  const popoverLogin: { [key: string]: string } = {
    ar: "تسجيل الدخول",
    en: "Login",
  };
  
  const popoverSignup: { [key: string]: string } = {
    ar: "التسجيل",
    en: "Signup",
  };
  

  const LogoText: { [key: string]: string } = {
    ar: "د. باسل توفيق",
    en: "Dr. Bassel Tawfik",
  };

  const handleNav = () => {
    setNav(!nav);
  };

  const navItems: { id: number; text: { [key: string]: string } }[] = [
    { id: 1, text: { ar: "الرئيسية", en: "Home" } },
    { id: 2, text: { ar: "الدورات", en: "Courses" } },
    { id: 3, text: { ar: "الكتب", en: "Books" } },
    { id: 4, text: { ar: "المقالات", en: "Articles" } },
    { id: 5, text: { ar: "عن الدكتور", en: "About" } },
    { id: 7, text: { ar: "تواصل معنا", en: "Contact" } },
  ];

  const toggleLanguage = (selectedLanguage: string) => {
    const newLanguage = selectedLanguage;
    const newDir = newLanguage === "ar" ? "rtl" : "ltr";
    const newFont = newLanguage === "ar" ? "ArabicFont" : "EnglishFont";

    localStorage.setItem("language", newLanguage);
    localStorage.setItem("dir", newDir);
    localStorage.setItem("font", newFont);

    document.documentElement.dir = newDir;
    document.body.className = newFont;

    setLanguage(newLanguage);
    setShowLanguageDropdown(false);

    const event = new CustomEvent("languageChange", {
      detail: {
        language: newLanguage,
        dir: newDir,
        font: newFont,
      },
    });
    window.dispatchEvent(event);
  };

  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", !isDarkMode);
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language") || "ar";
      const storedDir = localStorage.getItem("dir") || "rtl";
      const storedFont = localStorage.getItem("font") || "ArabicFont";
      const storedTheme = localStorage.getItem("theme") || "dark";

      setLanguage(storedLanguage);
      setIsDarkMode(storedTheme === "dark");

      document.documentElement.lang = storedLanguage;
      document.documentElement.dir = storedDir;
      document.body.className = storedFont;
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }
  }, []);

  return (
    <div className={`dark:bg-[#021526] bg-[#EEEEEE] flex justify-between items-center h-24 mx-auto px-4 text-[#03045e] dark:text-[#6EACDA] fixed top-0 w-full z-50 shadow-xl ${language === "ar" ? "ArabicFont2" : ""}`}>
      <div className="flex items-center space-x-3 dark:space-x-3">
        <h1 className="hidden lg:block text-3xl text-[#03045e] dark:text-[#6EACDA] mt-1">
          {LogoText[language]}
        </h1>
      </div>

      <ul className="hidden md:flex md:mr-20 gap-7">
        {navItems.map((item) => (
          <li key={item.id}>
            <Link href={item.text["en"] === "Home" ? "/" : `/${item.text["en"]}`}>
              <span className="custom-underline hover:text-[#3b4bb0] font-bold text-md flex items-center text-[#03045e] dark:text-[#6EACDA] dark:hover:text-sky-400">
                {item.text[language]}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="hidden md:flex md:gap-4 md:items-center dark:bg-[#021526] bg-[#EEEEEE]">
        <div className="relative">
          <button
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            className="text-[#03045e] dark:text-[#6EACDA] hover:text-[#3b4bb0] dark:hover:text-sky-400 focus:text-[#3b4bb0] font-bold text-md flex items-center"
          >
            <FontAwesomeIcon icon={faEarthAfrica} className="mr-2 text-xl" />
          </button>
          {showLanguageDropdown && (
            <div className="absolute right-0 mt-2 w-32 dark:bg-[#021526] bg-[#EEEEEE] shadow-lg rounded-md">
              <button
                onClick={() => toggleLanguage('en')}
                className="block w-full text-left px-4 py-2  text-[#03045e] dark:text-[#6EACDA] hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                English
              </button>
              <button
                onClick={() => toggleLanguage('ar')}
                className="block w-full text-left px-4 py-2 text-[#03045e] dark:text-[#6EACDA] hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                العربية
              </button>
            </div>
          )}
        </div>

        <button
          onClick={toggleDarkMode}
          className="text-[#03045e] dark:text-[#6EACDA] hover:text-[#3b4bb0] dark:hover:text-sky-400 focus:text-[#3b4bb0] font-bold text-md flex gap-2 items-center"
        >
          <FontAwesomeIcon
            icon={isDarkMode ? faSun : faMoon}
            className="mr-2 text-xl"
          />
          {isDarkMode ? toggleTexts.lightMode[language] : toggleTexts.darkMode[language]}
        </button>

        <button
          onClick={() => setShowPopover(!showPopover)} // Toggle popover visibility
          className="text-[#03045e] dark:text-[#6EACDA] hover:text-[#3b4bb0] dark:hover:text-sky-400 focus:text-[#3b4bb0] font-bold text-md"
        >
          <img
            src={isDarkMode ? UserDarkImg.src : UserLightImg.src}
            alt="User"
            className="w-7 h-7 rounded-full"
          />
        </button>

        {showPopover && (
          userService.isAuthenicated() ?
          <div 
          className={`absolute top-16 ${language === "ar" ? "left-5" : "right-5"} w-48 space-y-3 bg-white dark:bg-[#021526] text-[#03045e] dark:text-[#6EACDA] shadow-lg rounded-md p-4`}
        >
          <p className="text-sm mb-2">{popoverMessageAuth[language]}</p>
          {
            userService.getUserDetails()?.role === "Admin" &&
              <Link href="/AdminPanel" className="bg-[#3b4bb0] text-white px-4 py-2 rounded-md hover:bg-[#030447] dark:bg-[#4A90E2] dark:hover:bg-[#357ABD]">
              Dashboard
            </Link>
          }
          <button 
          onClick={userService.logout} 
          className="bg-[#3b4bb0] text-white px-4 py-2 rounded-md hover:bg-[#030447] dark:bg-[#4A90E2] dark:hover:bg-[#357ABD]">
            Logout
          </button>

        </div>
          :
          <div 
          className={`absolute top-16 ${language === "ar" ? "left-5" : "right-5"} w-48 bg-white dark:bg-[#021526] text-[#03045e] dark:text-[#6EACDA] shadow-lg rounded-md p-4`}
        >
          <p className="text-sm mb-2">{popoverMessage1[language]}</p>
          <div className="mt-4 flex flex-col gap-2">
            <Link href="/Login" className="bg-[#3b4bb0] text-white px-4 py-2 rounded-md hover:bg-[#030447] dark:bg-[#4A90E2] dark:hover:bg-[#357ABD]">
              {popoverLogin[language]}
            </Link>
            <Link href="/Signup" className="bg-[#4CAF50] text-white px-4 py-2 rounded-md hover:bg-[#388E3C] dark:bg-[#4CAF50] dark:hover:bg-[#388E3C]">
              {popoverSignup[language]}
            </Link>
          </div>
        </div>
        )}

      </div>

      <div className="flex justify-between items-center w-full md:hidden dark:bg-[#021526] bg-[#EEEEEE]">
        <h1 className="text-xl font-cookie mt-1 text-[#03045e] dark:text-[#6EACDA]">
          {LogoText[language]}
        </h1>      
        <div className="relative flex gap-4 md:hidden dark:bg-[#021526] bg-[#EEEEEE]">
        <button
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            className="text-[#03045e] dark:text-[#6EACDA] hover:text-[#3b4bb0] dark:hover:text-sky-400 focus:text-[#3b4bb0] font-bold text-md"
          >
            <FontAwesomeIcon icon={faEarthAfrica} className="text-xl" />
          </button>
          {showLanguageDropdown && (
            <div className="absolute right-0 mt-6 w-24 dark:bg-[#021526] bg-[#EEEEEE] shadow-lg rounded-md">
              <button
                onClick={(e) =>{
                  e.preventDefault();
                  e.stopPropagation();
                   toggleLanguage('en')
                }}
                className="z-50 block w-full text-sm text-left px-4 py-2 text-[#03045e] dark:text-[#6EACDA] hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                English
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleLanguage('ar')
                }}
                className="z-50 block w-full text-sm text-left px-4 py-2 text-[#03045e] dark:text-[#6EACDA] hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                العربية
              </button>
            </div>
          )}
          <button
            onClick={toggleDarkMode}
            className="text-[#03045e] dark:text-[#6EACDA] hover:text-[#3b4bb0] dark:hover:text-sky-400 focus:text-[#3b4bb0] font-bold text-md"
          >
            <FontAwesomeIcon
              icon={isDarkMode ? faSun : faMoon}
              className="text-xl"
            />
          </button>

          <button
          onClick={() => setShowPopover(!showPopover)} 
          className="text-[#03045e] dark:text-[#6EACDA] hover:text-[#3b4bb0] dark:hover:text-sky-400 focus:text-[#3b4bb0] font-bold text-md"
        >
          <img
            src={isDarkMode ? UserDarkImg.src : UserLightImg.src}
            alt="User"
            className="w-7 h-7 rounded-full"
          />
        </button>

        {showPopover && (
          userService.isAuthenicated() ?
          <div 
          className={`absolute top-16 ${language === "ar" ? "left-5" : "right-5"} w-48 bg-white dark:bg-[#021526] text-[#03045e] dark:text-[#6EACDA] shadow-lg rounded-md p-4`}
        >
          <p className="text-sm mb-2">{popoverMessageAuth[language]}</p>
          {
            userService.getUserDetails()?.role === "Admin" &&
              <Link href="/AdminPanel" className="bg-[#3b4bb0] text-white px-4 py-2 rounded-md hover:bg-[#030447] dark:bg-[#4A90E2] dark:hover:bg-[#357ABD]">
              Dashboard
            </Link>
          }
          <button 
          onClick={userService.logout} 
          className="bg-[#3b4bb0] text-white px-4 py-2 rounded-md hover:bg-[#030447] dark:bg-[#4A90E2] dark:hover:bg-[#357ABD]">
            Logout
          </button>
          
          
        </div>
          :
          <div 
          className={`absolute top-16 ${language === "ar" ? "left-5" : "right-5"} w-48 bg-white dark:bg-[#021526] text-[#03045e] dark:text-[#6EACDA] shadow-lg rounded-md p-4`}
        >
          <p className="text-sm mb-2">{popoverMessage1[language]}</p>
          <div className="mt-4 flex flex-col gap-2">
            <Link href="/Login" className="bg-[#3b4bb0] text-white px-4 py-2 rounded-md hover:bg-[#030447] dark:bg-[#4A90E2] dark:hover:bg-[#357ABD]">
              {popoverLogin[language]}
            </Link>
            <Link href="/Signup" className="bg-[#4CAF50] text-white px-4 py-2 rounded-md hover:bg-[#388E3C] dark:bg-[#4CAF50] dark:hover:bg-[#388E3C]">
              {popoverSignup[language]}
            </Link>
          </div>
        </div>
      )}

          <button
            onClick={handleNav}
            className="text-[#03045e] dark:text-[#6EACDA] hover:text-[#3b4bb0] dark:hover:text-sky-400 focus:text-[#3b4bb0] font-bold text-md"
          >
            {!nav ? (
              <FontAwesomeIcon icon={faBars} className="text-xl" />
            ) : (
              <FontAwesomeIcon icon={faXmark} className="text-xl" />
            )}
          </button>
        </div>
      </div>

      <ul
        className={
          nav
            ? "dark:bg-[#021526] bg-[#EEEEEE] mt-24 fixed md:hidden left-0 top-0 w-full h-[355px] border-r border-r-gray-900 shadow-xl transition-opacity duration-500 ease-in-out opacity-100"
            : "dark:bg-[#021526] bg-[#EEEEEE] mt-24 fixed hidden left-0 top-0 w-full h-[355px] border-r border-r-gray-900 shadow-xl transition-opacity duration-500 ease-in-out opacity-0 pointer-events-none"
        }
      >
        {navItems.map((item) => (
          <li key={item.id} className="mt-2 w-full flex justify-center text-center p-3">
            <Link href={item.text["en"] === "Home" ? "/" : `/${item.text["en"]}`}>
              <span className="custom-underline hover:text-[#3b4bb0] font-bold text-lg flex items-center text-[#03045e] dark:text-[#6EACDA] dark:hover:text-sky-400">
                {item.text[language]}
              </span>
            </Link>
          </li>
        ))}
      </ul>

    </div>
  );
}
