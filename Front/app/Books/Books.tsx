"use client";

import { useState, useEffect } from "react";
import BookImage from "../Assets/Images/book-cover.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faBookmark, faDownload } from '@fortawesome/free-solid-svg-icons';
import { AdminService } from "../Services/AdminService";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [BooksItems, setBooksItems] = useState<BooksResponse>();
  const adminService = new AdminService();
  useEffect(() => {
    adminService.getBooks().then((response) => {
      setBooksItems(response);
    });
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") || "dark";
      setIsDarkMode(storedTheme === "dark");
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }
  }, [isDarkMode]);

  
  return (
    <div dir="ltr" className="flex justify-center w-full min-h-screen text-[#03045e] dark:text-[#6EACDA] bg-[#EEEEEE] dark:bg-[#021526]">
      <div className="w-[90%] flex flex-col items-center gap-10">
        {BooksItems?.books.map((book) => (
          <div key={book.bookId} className="w-full flex flex-col md:flex md:flex-row rounded-lg overflow-hidden shadow-lg bg-white dark:bg-[#1E2A38] h-[900px] md:h-[500px]">
            <div className="w-full flex justify-center md:flex md:flex-row md:justify-normal md:w-fit p-3">
              <img src={book.coverImage} alt="Book Cover" className="w-[80%] md:h-full md:w-fit rounded-xl object-cover" />
            </div>
            <div className="w-full md:w-[70%] p-3 flex flex-col items-center gap-10">
              <h1 className="text-3xl md:text-5xl font-bold text-center">{book.title}</h1>
              <p className="text-lg text-slate-600 dark:text-white md:text-2xl text-center">{book.description}</p>

              <div className="w-full flex md:flex-row items-center justify-between">
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 text-lg md:text-2xl">
                    <FontAwesomeIcon icon={faBookmark} />
                    <span className="text-lg md:text-2xl">Chapters:</span>
                  </div>
                  <p className="text-slate-600 dark:text-white text-lg md:text-2xl">{book.chapters}</p>
                </div>

                <div className="flex gap-3">
                  <div className="flex items-center gap-2 text-lg md:text-2xl">
                    <FontAwesomeIcon icon={faFile} />
                    <span className="text-lg md:text-2xl">Pages:</span>
                  </div>
                  <p className="text-slate-600 dark:text-white text-lg md:text-2xl">{book.pages}</p>
                </div>
              </div>

              <div className="md:mt-10 w-full flex flex-col items-center gap-5">
                <p className="text-slate-600 dark:text-white text-lg md:text-2xl text-center"> You can now Download it & start learning </p>
                <button className="button-container2">
                  <a href={book.url} className="flex gap-3 items-center text-lg md:text-2xl font-semibold text-white dark:text-black bg-[#03045e] dark:bg-[#6EACDA] py-2 px-10 rounded-lg dark:hover:bg-[#72b7eb] hover:bg-[#030446]">
                    <FontAwesomeIcon className="icon" icon={faDownload} />
                    Download
                  </a>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
