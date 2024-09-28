"use client";

import { AdminService } from "@/app/Services/AdminService";
import { useEffect, useState } from "react";

export default function AddTutorial(props :{courseName: string}) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [url, setUrl] = useState<string>("");
  const [name, setName] = useState<string>("");

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
  const adminService = new AdminService();
  const handelAddTutorial = async () => {
    if (name === "" || url === "") {
      alert("Please Fill All The Fields");
      return;
    }
    const body : TutorialRequest = {
      courseName: props.courseName,
      tutorialName: name,
      tutorialLink: url
    }
    console.log(body);
    
    adminService.addTutorial(body).then((res) => {
      if (res?.ok) {
        alert("Tutorial Added Successfully");
        setName("");
        setUrl("");
      } else {
        alert("An Error Occurred");
      }
    });
  };
  return (
    <div className="flex w-full justify-center">
      <div className="w-[90%] md:w-[80%] flex flex-col gap-10 text-[#03045e] dark:text-[#6EACDA] p-5">
        <div className="flex justify-center">
          <h1 className="text-3xl md:text-4xl text-center">Add Tutorial</h1>
        </div>

        <div
          className="w-full flex flex-col gap-10 items-center"
        >
          <div className="w-full flex flex-col items-center gap-5 md:gap-10 md:flex md:flex-row md:items-baseline md:justify-around">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xl md:text-2xl">
                Tutorial Name
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
              <label htmlFor="Url" className="text-xl md:text-2xl">
                Url Link
              </label>
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                type="text"
                name="Url"
                id="Url"
                placeholder="Enter The Url Link"
                className="w-[300px] md:w-[400px] p-2 rounded-lg outline-none bg-[#03045e] dark:bg-white text-white dark:text-black placeholder:text-slate-200 dark:placeholder:text-slate-500"
              />
            </div>
          </div>
          <button 
          onClick={handelAddTutorial}
          className="mt-10 font-semibold bg-[#03045e] dark:bg-white hover:bg-[#030447] dark:hover:bg-slate-200 text-white dark:text-black p-2 rounded-lg w-[200px] md:w-[300px]">
            Add Tutorial
          </button>
        </div>
      </div>
    </div>
  );
}
