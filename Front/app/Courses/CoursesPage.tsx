"use client";

import { useState, useEffect } from "react";
import TranslationPair from "../Lib/Types";
import CoursesNavbar from "./CoursesNavbar";
import CoursesSection from "./Courses";
import { AdminService } from "../Services/AdminService";

export default function Courses() {

    const [language, setLanguage] = useState<string>("ar");
    const [filteredCourses, setFilteredCourses] = useState<CourseRequest[]>([]);
    const [items, setItems] = useState<CoursesResponse>({courses: [] , totalCourses: 0 ,totalTutorials: 0});
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [activeTab, setActiveTab] = useState<string>("All");
    const adminService = new AdminService();
    useEffect(() => {
        function fetchCourses() {
          adminService.getCourses().then((response) => {
            setItems(response ?? {courses: [] , totalCourses: 0 ,totalTutorials: 0});
            setFilteredCourses(response?.courses?? []);
          });
        }
        fetchCourses();
    }, []);
    useEffect(() => {
      if (searchQuery === "") {
        if(activeTab === "All") {
          setFilteredCourses(items.courses);
        }else{
          setFilteredCourses(items.courses.filter((course) => course.courseType === activeTab));
        }
      } else {
        if(activeTab === "All") {
          setFilteredCourses(items.courses.filter((course) => course.courseName.toLowerCase().includes(searchQuery.toLowerCase())));
        }else{
          setFilteredCourses(items.courses.filter((course) => course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) && course.courseType === activeTab));
        }
      }
    }, [searchQuery]);
    useEffect(() => {
      if (typeof window !== "undefined") {
        const storedTheme = localStorage.getItem("theme") || "dark";
        setIsDarkMode(storedTheme === "dark");
        document.documentElement.classList.toggle("dark", storedTheme === "dark");
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
  
    const CoursesTitle: TranslationPair = { ar: "الدورات", en: "Courses" };
    const CoursesDescription: TranslationPair = { en: "Explore the valuable courses delivered by Dr. Bassil and begin your learning journey today!", ar: "استكشف الدورات القيمة التي يقدمها دكتور باسل وابدأ رحلتك التعليمية اليوم!" };
  
    const handleTabChange = (tabName: string) => {
      setActiveTab(tabName);
      if (tabName === "All") {
        setFilteredCourses(items.courses.filter((course) => course.courseName.toLowerCase().includes(searchQuery.toLowerCase())));
      } else if (tabName === "Educational") {
        setFilteredCourses(items.courses.filter((course) => course.courseType === "Educational" && course.courseName.toLowerCase().includes(searchQuery.toLowerCase())));
      } else if (tabName === "Islamic") {
        setFilteredCourses(items.courses.filter((course) => course.courseType === "Islamic" && course.courseName.toLowerCase().includes(searchQuery.toLowerCase())));
      }
    };
  
    return (
      <div className="w-full flex justify-center min-h-screen text-[#03045e] dark:text-[#6EACDA] bg-[#EEEEEE] dark:bg-[#021526]">
        <div className="w-full flex flex-col items-center gap-10 md:gap-20 mt-32">
          <div className="flex flex-col items-center gap-10">
            <h1 className="text-3xl font-semibold md:text-5xl text-center">
              {CoursesTitle[language]}
            </h1>
            <p className="text-xl md:text-2xl text-center">
              {CoursesDescription[language]}
            </p>
          </div>
          <CoursesNavbar onTabChange={handleTabChange} setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
          <CoursesSection courses={filteredCourses} />
          <div className="h-32">
          </div>
        </div>
      </div>
    );
}