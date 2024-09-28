"use client";

import { useState, useEffect } from "react";
import Article1Img from "../Assets/Images/Article1.jpg";
import Article2Img from "../Assets/Images/Article2.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import "../globals.css";
import { AdminService } from "../Services/AdminService";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [ArticleItems, setArticleItems] = useState<ArticlesResponse>();
  const adminService = new AdminService();
  useEffect(() => {
    adminService.getArticles().then((response) => {
      setArticleItems(response
      );
    }
    );
  } ,[]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") || "dark";
      setIsDarkMode(storedTheme === "dark");
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }
  }, [isDarkMode]);

  

  return (
    <div dir="ltr" className="flex justify-center w-full min-h-screen text-[#03045e] dark:text-[#6EACDA] bg-[#EEEEEE] dark:bg-[#021526]">
      <div className="w-[90%] flex flex-col md:flex md:flex-row md:items-baseline md:justify-center items-center gap-10">
        {ArticleItems?.articles.map((article, index) => (
          <div key={index} className="w-full md:w-[30%] flex flex-col bg-white dark:bg-[#1E2A38] rounded-lg overflow-hidden shadow-lg">
            <div className="p-4">
              <img src={article.articleImg} alt={article.title} className="w-full max-h-64 rounded-lg object-cover" />
            </div>
            <div className="flex flex-col gap-5 p-4">
              <h1 className="text-lg md:text-2xl">{article.title}</h1>
              <p className="text-sm md:text-lg">{article.description}</p>
              <button className="w-[90%] md:w-[50%]">
                <a href={article.articleUrl} className="flex gap-3 justify-center items-center text-lg md:text-xl font-semibold text-white dark:text-black bg-[#03045e] dark:hover:bg-[#72b7eb] hover:bg-[#030446] dark:bg-[#6EACDA] py-2 px-5 rounded-lg button-container">
                  Check It Now
                  <FontAwesomeIcon className="arrow-icon" icon={faArrowRight} />
                </a>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
