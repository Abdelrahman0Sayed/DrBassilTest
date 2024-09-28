"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { AdminService } from "@/app/Services/AdminService";

type CoursesTableProps = {
    setActiveComponent: (view: string) => void;
    setCourseToAddTutorial: any;
    search: string;
    items: CoursesResponse;
};

export default function CoursesTable({ setActiveComponent ,setCourseToAddTutorial,search,items}: CoursesTableProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const filterItems = () => {
    return  items.courses.filter((item) =>{
      return item.courseName
      .toLowerCase()
      .includes(search.toLowerCase()) || 
      item.grade
      .toLowerCase()
      .includes(search.toLowerCase())
    }).map((item) => {
        {
          const course : Course = {
            courseName: item.courseName,
            grade: parseInt(item.grade),
            type: item.courseType,
            courseImg64: item.courseImg
          }
          return {
            course : course,
            courseRequest : item
          }
        } 
      });
  }
  useEffect(() => {

    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") || "dark";
      setIsDarkMode(storedTheme === "dark");
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }
  }, [isDarkMode,items]);
  
  const CoursesItems = filterItems();

  const handleEditClick = (courseRequest : CourseRequest) => {
    setCourseToAddTutorial(courseRequest.courseName);
    setActiveComponent('Add Tutorial');
  };

  return (
    <div className="w-[90%] flex justify-center  px-4 md:px-8">
      <div className="w-[90%] md:w-[70%] max-w-full shadow-sm border border-black dark:border-white rounded-lg overflow-x-auto dark:bg-[#021526] bg-[#EEEEEE]">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b border-black dark:border-white dark:bg-[#021526] dark:text-[#6EACDA]">
            <tr className="bg-[#03045e] dark:bg-white text-white
              dark:text-black">
              <th className="py-3 px-6">Course Name</th>
              <th className="py-3 px-6">Grade</th>
              <th className="py-3 px-6">Add</th>

            </tr>
          </thead>
          <tbody className="text-[#03045e] dark:text-[#6EACDA] divide-y divide-black dark:divide-white ">
            {CoursesItems.map((item, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">{item.courseRequest.courseName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.courseRequest.grade}</td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-4">
                  <button 
                  className="text-xl text-green-500 hover:text-green-600"
                  onClick={() => handleEditClick(item.courseRequest)}>
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
