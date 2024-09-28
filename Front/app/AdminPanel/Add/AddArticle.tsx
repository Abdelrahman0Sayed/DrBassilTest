"use client";

import { AdminService } from "@/app/Services/AdminService";
import DefaultImage from "../../Assets/Images/defaultImage.png";
import { useEffect, useState } from "react";

export default function EditArticle() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [title, setTitle] = useState("");
  const [urlLink, setUrlLink] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") || "dark";
      setIsDarkMode(storedTheme === "dark");
      document.documentElement.classList.toggle(
        "dark",
        storedTheme === "dark"
      );
    }
  }, [isDarkMode]);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const adminService = new AdminService();
  const handelAddArticle = () => {
    const article : AddArticleRequest= {
      articleTitle: title,
      articleUrl: urlLink,
      description: description,
      articleImg: selectedImage,
    };
    adminService.addArticle(article).then((res) => {
      if (res?.ok) {
        alert("Article Added Successfully");
        setTitle("");
        setUrlLink("");
        setDescription("");
        setSelectedImage('');
      } else {
        alert("Failed To Add Article");
      }
    });
  }
  return (
    <div className="flex w-full justify-center">
      <div className="w-[90%] md:w-[80%] flex flex-col gap-10 text-[#03045e] dark:text-[#6EACDA] p-5">
        <div className="flex justify-center">
          <h1 className="text-3xl md:text-4xl text-center">Add Article</h1>
        </div>

        <div
          className="w-full flex flex-col gap-10 items-center"
        >
          <div className="w-full flex flex-col items-center gap-5 md:gap-10 md:flex md:flex-row md:items-baseline md:justify-around">
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-xl md:text-2xl">
                Article Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                name="title"
                id="title"
                placeholder="Enter The Article Title"
                className="w-[300px] md:w-[400px] p-2 rounded-lg outline-none bg-[#03045e] dark:bg-white text-white dark:text-black placeholder:text-slate-200 dark:placeholder:text-slate-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="urlLink" className="text-xl md:text-2xl">
                Url Link
              </label>
              <input
                value={urlLink}
                onChange={(e) => setUrlLink(e.target.value)}
                type="text"
                name="urlLink"
                id="urlLink"
                placeholder="Enter The Url Link"
                className="w-[300px] md:w-[400px] p-2 rounded-lg outline-none bg-[#03045e] dark:bg-white text-white dark:text-black placeholder:text-slate-200 dark:placeholder:text-slate-500"
              />
            </div>
          </div>

          <div className="w-full flex flex-col items-center gap-5 md:gap-10 md:flex md:flex-row md:items-center md:justify-around">
            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="text-xl md:text-2xl">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                id="description"
                placeholder="Enter The Description"
                className="w-[300px] md:w-[400px] h-10 p-2 rounded-lg outline-none bg-[#03045e] dark:bg-white text-white dark:text-black placeholder:text-slate-200 dark:placeholder:text-slate-500"
              />
            </div>
            <div className="flex items-center justify-center gap-6 ">
                <div className="shrink-0">
                    <img className="h-16 w-16 object-cover rounded-lg" src={selectedImage !== '' ? selectedImage : DefaultImage.src} />
                </div>
                <label className="block">
                    <span className="sr-only">Choose profile photo</span>
                    <input
                        type="file"
                        className="block w-full text-sm text-black dark:text-white
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-[#03045e] file:dark:bg-white 
                        file:hover:bg-[#030447] file:dark:hover:bg-slate-200
                        file:text-white file:dark:text-black
                        hover:file:bg-[#030447] hover:file:dark:bg-slate-200
                        "
                        onChange={handleImageChange}
                    />
                </label>
            </div>
          </div>

          <button 
          onClick={handelAddArticle}
          className="mt-10 font-semibold bg-[#03045e] dark:bg-white hover:bg-[#030447] dark:hover:bg-slate-200 text-white dark:text-black p-2 rounded-lg w-[200px] md:w-[300px]">
            Add Article
          </button>
        </div>
      </div>
    </div>
  );
}
