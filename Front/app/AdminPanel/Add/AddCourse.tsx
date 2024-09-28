"use client";

import { useEffect, useState } from "react";
import DefaultImage from "../../Assets/Images/defaultImage.png";
import { AdminService } from "@/app/Services/AdminService";


export default function AddCourse() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [type, setType] = useState("Educational");

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
  const addCourse = async () => {
    const course : Course = {
      courseName: name,
      grade: parseInt(grade),
      type: type,
      courseImg64: selectedImage
    }
    const response = await adminService.addCourse(course);
    if(response?.ok){
      window.location.href = "/AdminPanel";
    }
  };
  return (
    <div className="flex w-full justify-center">
      <div className="w-[90%] md:w-[80%] flex flex-col gap-10 text-[#03045e] dark:text-[#6EACDA] p-5">
        <div className="flex justify-center">
          <h1 className="text-3xl md:text-4xl text-center">Add Course</h1>
        </div>

        <div
          className="w-full flex flex-col gap-10 items-center"
        >
          <div className="w-full flex flex-col items-center gap-5 md:gap-10 md:flex md:flex-row md:items-baseline md:justify-around md:flex-wrap">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xl md:text-2xl">
                Course Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                id="name"
                placeholder="Enter The Course Name"
                className="w-[300px] md:w-[400px] p-2 rounded-lg outline-none bg-[#03045e] dark:bg-white text-white dark:text-black placeholder:text-slate-200 dark:placeholder:text-slate-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="grade" className="text-xl md:text-2xl">
                Grade
              </label>
              <input
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                type="text"
                name="grade"
                id="grade"
                placeholder="Enter The Grade"
                className="w-[300px] md:w-[400px] p-2 rounded-lg outline-none bg-[#03045e] dark:bg-white text-white dark:text-black placeholder:text-slate-200 dark:placeholder:text-slate-500"
              />
            </div>

            <div className="w-full flex flex-col items-center gap-5 md:gap-10 md:flex md:flex-row md:items-center md:justify-around">
              <div className="flex flex-col gap-2">
                <label htmlFor="type" className="text-xl md:text-2xl">
                  Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)} 
                  className="w-[300px] md:w-[400px] p-2 rounded-lg outline-none bg-[#03045e] dark:bg-white text-white dark:text-black">
                  <option>Educational</option>
                  <option>Islamic</option>
                </select>
              </div>
  
              <div className="flex items-center justify-center gap-6 ">
                 {
                    selectedImage !== "" ? (
                      <div className="shrink-0">
                        <img className="h-16 w-16 object-cover rounded-lg" src={selectedImage} />
                    </div>
                    ) : 
                    (
                      <div className="shrink-0">
                        <img className="h-16 w-16 object-cover rounded-lg" src={DefaultImage.src} />
                    </div>)
                 }
                  
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

          </div>
          <button 
          onClick={addCourse}
          className="mt-10 font-semibold bg-[#03045e] dark:bg-white hover:bg-[#030447] dark:hover:bg-slate-200 text-white dark:text-black p-2 rounded-lg w-[200px] md:w-[300px]">
            Add Course
          </button>
        </div>
      </div>
    </div>
  );
}
