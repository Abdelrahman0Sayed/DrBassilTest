// CoursesTable.js
"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import DeleteModal from "../../Components/DeleteModal"; 
import { AdminService } from "@/app/Services/AdminService";
import Tutorials from "../Add/Tutorials";

type CoursesTableProps = {
  setCurrentView: (view: string) => void;
  items: CoursesResponse;
  search: string;
  setCourseToEdit: any;
  setItems: any;
};

// interface CourseView {
//   Name: string;
//   Grade: string;
//   Tutorials: number;
// }

export default function CoursesTable({ setCurrentView , items , search ,setCourseToEdit ,setItems}: CoursesTableProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null as CourseRequest | null);
  const adminService = new AdminService();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") || "dark";
      setIsDarkMode(storedTheme === "dark");
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }
  }, [isDarkMode]);

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

  const CoursesItems = filterItems();

  const handleEditClick = (course:CourseRequest) => {
    setCourseToEdit(course);
    setCurrentView("editCourse");
  };

  const handleDeleteClick = (course: CourseRequest) => {
    setCourseToDelete(course);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("Deleted course:", courseToDelete);
    adminService.deleteCourse(courseToDelete?.courseName ?? "").then(async (res) => {
      if (await res?.ok) {
        setItems(
          {
            totalCourses: items.totalCourses - 1,
            totalTutorials: items.totalTutorials - (courseToDelete?.tutorials ?? 0),
            courses: items.courses.filter((item) => item.courseName !== courseToDelete?.courseName),
          }
        );
      }
    });
    setIsModalOpen(false);
  };

  return (
    <div className="w-[90%] flex justify-center px-4 md:px-8">
      <div className="w-[90%] md:w-[70%] max-w-full shadow-sm border border-black dark:border-white rounded-lg overflow-x-auto dark:bg-[#021526] bg-[#EEEEEE]">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b border-black dark:border-white dark:bg-[#021526] dark:text-[#6EACDA]">
            <tr className="bg-[#03045e] dark:bg-white text-white dark:text-black">
              <th className="py-3 px-6">Course Name</th>
              <th className="py-3 px-6">Grade</th>
              <th className="py-3 px-6">Tutorials</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="text-[#03045e] dark:text-[#6EACDA] divide-y divide-black dark:divide-white ">
            {CoursesItems.map((item, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">{item.course.courseName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.courseRequest.grade}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.courseRequest.tutorials}</td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-4">
                  <button
                    className="text-xl text-green-500 hover:text-green-600"
                    onClick={() => handleEditClick(item.courseRequest)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button
                    className="text-xl text-red-500 hover:text-red-600"
                    onClick={() => handleDeleteClick(item.courseRequest)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        description={`Are you sure you want to delete ${courseToDelete?.courseName}?`}
      />
    </div>
  );
}
