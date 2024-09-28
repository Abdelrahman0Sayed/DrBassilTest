"use client";

import { useEffect, useState } from 'react';
import Navbar from '@/app/Components/Navbar';
import Footer from '@/app/Components/Footer';
import { usePathname } from 'next/navigation';
import { AdminService } from '@/app/Services/AdminService';



// const Course1Lectures: Lecture[] = [
//     { title: "Lecture 1", embededUrl: "https://www.youtube.com/embed/13_wcay83yU?rel=0&modestbranding=1&playsinline=1", id: 1 },
//     { title: "Lecture 2", embededUrl: "https://www.youtube.com/embed/13_wcay83yU?rel=0&modestbranding=1&playsinline=1", id: 2 },
//     { title: "Lecture 3", embededUrl: "https://www.youtube.com/embed/13_wcay83yU?si=COqWPSuePQzHBV1s", id: 3 },
//     { title: "Lecture 4", embededUrl: "https://www.youtube.com/embed/13_wcay83yU?si=COqWPSuePQzHBV1s", id: 4 },
//     { title: "Lecture 5", embededUrl: "https://www.youtube.com/embed/13_wcay83yU?si=COqWPSuePQzHBV1s", id: 5 },
// ];

const CourseDetail: React.FC = () => {
    const [language, setLanguage] = useState<string>("ar");
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [selectedLecture, setSelectedLecture] = useState<TutorialResponse>();
    const [id, setId] = useState<string | null | undefined>(null);
    const pathname = usePathname();  
    const [Course1Lectures, setCourse1Lectures] = useState<getTutorialsResponse>({courseName: "", courseType: "", totalLectures: 0, tutorials: [], courseImg: ""});
    const adminService = new AdminService();
    useEffect(() => {
        const id2 = pathname.split('/').pop();
        setId(id2);
        if (id2) {
            adminService.getTutorials(id2).then((response) => {
                if (response) {
                    setCourse1Lectures(response ?? {courseName: "", courseType: "", totalLectures: 0, tutorials: [], courseImg: ""});
                    setSelectedLecture(response.tutorials[0]);
                }
            })
        }
    }, [pathname]);  

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

    const LectureDescription: { [key: string]: string } = {
        en: "Choose your lecture and begin your learning journey now!",
        ar: "اختر محاضرتك وابدأ رحلتك التعليمية الآن!"
    };



    // useEffect(() => {
    //     if (!selectedLecture && Course1Lectures?.totalLectures !== 0) {
    //         setSelectedLecture();
    //     }
    // }, [selectedLecture]);

    return (
        <>
        <Navbar />
        <div className="flex justify-center min-h-screen text-[#03045e] dark:text-[#6EACDA] bg-[#EEEEEE] dark:bg-[#021526]">
            <div className="w-full flex justify-center mt-32">
                <div className="flex flex-col items-center w-[90%] gap-10 md:gap-20">
                    <div className="flex flex-col items-center gap-10">
                        <h1 dir="ltr" className="text-3xl font-semibold md:text-5xl text-center">
                            {Course1Lectures.courseName}
                        </h1>
                        <p className="text-xl md:text-2xl text-center">
                            {LectureDescription[language]}
                        </p>
                    </div>

                    <div dir="ltr" className="flex justify-center w-full">
                        <div className="flex justify-center w-[80%] flex-wrap gap-4">
                            {Course1Lectures.tutorials.map((lecture,idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedLecture(lecture)}
                                    className={`font-semibold p-2 rounded-full flex items-center justify-center w-10 h-10 ${
                                        selectedLecture?.lectureId === lecture.lectureId 
                                        ? 'bg-white text-black dark:bg-[#030447] dark:text-white' 
                                        : 'bg-[#03045e] dark:bg-white text-white dark:text-black'
                                    } hover:bg-[#030447] dark:hover:bg-slate-200`}
                                >
                                    {idx + 1}
                                </button>
                            ))}
                        </div>
                    </div>


                    {selectedLecture && (
                        <div className="flex flex-col gap-10">
                            <h1 dir="ltr" className="text-2xl font-semibold md:text-4xl text-center">
                                {selectedLecture.lectureName}
                            </h1>
                            <div className="relative w-full">
                                <iframe
                                    src={selectedLecture.url}
                                    className="w-full h-40 md:h-64 lg:h-80 border-2 border-gray-300 rounded-lg shadow-lg"
                                    style={{ aspectRatio: '16 / 9', border: 'none' }}
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    )}

                    <div className="md:h-20"></div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default CourseDetail;
