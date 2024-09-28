"use client";

import { useState, useEffect } from "react";

interface NavigatorProps {
    setActiveComponent: (component: string | null) => void;
}

export default function Navigator({ setActiveComponent }: NavigatorProps) {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [activeButton, setActiveButton] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedTheme = localStorage.getItem("theme") || "dark";
            setIsDarkMode(storedTheme === "dark");
            document.documentElement.classList.toggle("dark", storedTheme === "dark");
        }
    }, [isDarkMode]);

    const handleButtonClick = (buttonName: string) => {
        setActiveButton(buttonName);
        setActiveComponent(buttonName);
    };

    const buttonClass = (buttonName: string) => 
        activeButton === buttonName
            ? "bg-orange-700 text-white"
            : "bg-[#03045e] text-white dark:bg-white dark:text-black hover:bg-[#030447] dark:hover:bg-slate-200";

    return (
        <div className="w-full flex justify-center">
            <div className="w-[90%] flex flex-col items-center gap-5 md:gap-10 md:flex md:flex-row md:items-baseline md:justify-center md:flex-wrap">
                <button 
                    className={`font-semibold p-2 rounded-lg ${buttonClass('Add Course')}`}
                    onClick={() => handleButtonClick('Add Course')}
                >
                    Add Course
                </button>

                <button 
                    className={`font-semibold p-2 rounded-lg ${buttonClass('Tutorials')}`}
                    onClick={() => handleButtonClick('Tutorials')}
                >
                    Add Tutorial
                </button>

                <button 
                    className={`font-semibold p-2 rounded-lg ${buttonClass('Add Book')}`}
                    onClick={() => handleButtonClick('Add Book')}
                >
                    Add Book
                </button>

                <button 
                    className={`font-semibold p-2 rounded-lg ${buttonClass('Add Article')}`}
                    onClick={() => handleButtonClick('Add Article')}
                >
                    Add Article
                </button>
            </div>
        </div>
    );
}
