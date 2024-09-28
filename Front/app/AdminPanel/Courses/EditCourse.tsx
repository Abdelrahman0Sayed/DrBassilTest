"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import DeleteModal from "../../Components/DeleteModal"; 
import DefaultImage from "../../Assets/Images/defaultImage.png";
import { AdminService } from "@/app/Services/AdminService";


export default function EditCourse(course: CourseRequest) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [selectedImage, setSelectedImage] = useState(course.courseImg || "");
  const [name, setName] = useState(course.courseName);
  const [grade, setGrade] = useState(course.grade);
  const [type, setType] = useState(course.courseType);
  const [selectedTutorial, setSelectedTutorial] = useState<TutorialResponse>();
  const [tutorialName, setTutorialName] = useState("");
  const [urlLink, setUrlLink] = useState("");
  const [CourseTutorials, setCourseTutorials] = useState<getTutorialsResponse>( {courseName: "", courseType: "", totalLectures: 0, tutorials: [], courseImg: ""});
  const adminService = new AdminService();
  
  useEffect(() => {
    console.log("Course", course);
    
    const fetchTutorials = async () => {
      try {
        const response = await adminService.getTutorials(course.courseName);
        setCourseTutorials(response || {courseName: "", courseType: "", totalLectures: 0, tutorials: [], courseImg: ""});
        console.log("Tutorials Fetched", response);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchTutorials();
  }, [course.courseName]);

  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") || "dark";
      setIsDarkMode(storedTheme === "dark");
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }
  }, [isDarkMode]);
  
  const handleConfirmDelete = () => {
    if (!selectedTutorial) {
      return;
    }
    adminService.deleteTutorial(selectedTutorial.lectureName).then((res) => {
      if (res?.ok) {
        alert("Tutorial deleted successfully");
      } else {
      }
    }).then(() => {
      window.location.href = "/AdminPanel";
    });
    setIsModalOpen(false);
  }

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

  const handelEditTutorial = () => {
    if (!tutorialName || !urlLink) {
      return;
    }

    const dto: EditTutorialDto = {
        currentCourseName: course.courseName,
        currentTutorialName: selectedTutorial?.lectureName || "",
        updatedTutorialName: tutorialName,
        updatedTutorailUrl: urlLink
    };

    adminService.EditTutorial(dto).then((res) => {
      if (res?.ok) {
        alert("Tutorial Updated Successfully");
      } else {
      }
    });
  }

  return (
    <div className="flex w-full justify-center">
      <div className="w-[90%] md:w-[80%] flex flex-col gap-10 text-[#03045e] dark:text-[#6EACDA] p-5">
        <div className="flex justify-center">
          <h1 className="text-3xl md:text-4xl text-center">Edit Your Course</h1>
        </div>

        <div className="w-full flex flex-col gap-10 items-center">
          <div className="w-full flex flex-col items-center gap-5 md:gap-10 md:flex md:flex-row md:items-baseline md:justify-around ">
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
                onChange={(e) => setGrade((e.target.value))}
                type="number"
                name="grade"
                id="grade"
                placeholder="Enter The Grade"
                className="w-[300px] md:w-[400px] p-2 rounded-lg outline-none bg-[#03045e] dark:bg-white text-white dark:text-black placeholder:text-slate-200 dark:placeholder:text-slate-500"
              />
            </div>
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
                  <div className="shrink-0">
                      <img className="h-16 w-16 object-cover rounded-lg" src={selectedImage} />
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
            onClick={() => {
              adminService.EditCourse({
                currentCourseName: course.courseName,
                updatedCourseName: name,
                updatedGrade: parseInt(grade),
                updatedType: type,
                updatedCourseImg: selectedImage
              }).then((res) => {
                if (res?.ok) {
                  alert("Course Updated Successfully");
                } else {
                }
              });
            }} 
          className="mt-10 font-semibold bg-[#03045e] dark:bg-white hover:bg-[#030447] dark:hover:bg-slate-200 text-white dark:text-black p-2 rounded-lg w-[200px] md:w-[300px]">
            Update Course
          </button>
        </div>

        <div className="flex justify-center mt-20">
          <h1 className="text-3xl md:text-4xl text-center">
            Edit Your Course Tutorials
          </h1>
        </div>

        <div className="flex justify-center">
          <div className="flex justify-center w-[80%] md:w-[60%] flex-wrap gap-4 ">
          {
            CourseTutorials.tutorials && CourseTutorials.tutorials.length > 0 ? (
              CourseTutorials.tutorials.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() =>{ 
                    setSelectedTutorial(item) 
                    setTutorialName(item.lectureName)
                    setUrlLink(item.url)
                  }}
                  className="font-semibold p-2 rounded-full bg-[#03045e] dark:bg-white text-white dark:text-black flex items-center justify-center w-10 h-10 hover:bg-[#030447] dark:hover:bg-slate-200"
                >
                  {idx+1}
                </button>
              ))
            ) : (
              <p>No tutorials available</p> // Fallback UI when there are no tutorials
            )
          }
          </div>
        </div>

        {selectedTutorial ? (
          <div className="flex flex-col gap-10 mt-10">
            <div className="w-full flex justify-center">
              <button
                className="w-[90%] md:w-[40%] flex justify-center items-center gap-4 bg-red-700 hover:bg-red-800 rounded-lg"
                onClick={() => setIsModalOpen(true)} 
              >
                <h2 className="text-xl text-white p-2 md:text-2xl text-center ">
                  Delete Tutorial {selectedTutorial.lectureName}
                </h2>
                <FontAwesomeIcon icon={faTrashCan} className="text-xl md:text-2xl text-white " />
              </button>
            </div>

            <div className="relative flex items-center">
              <hr className="flex-grow border-t border-2 border-black dark:border-white" />
              <span className="mx-4 text-lg font-semibold text-black dark:text-white">or</span>
              <hr className="flex-grow border-t border-2 border-black dark:border-white" />
            </div>

            <div className="flex flex-col gap-10">
              <div className="flex justify-center">
                <h2 className="text-2xl md:text-3xl text-center">
                  Edit Tutorial {selectedTutorial.lectureName}
                </h2>
              </div>
              <div className="w-full flex flex-col gap-10 items-center">
                <div className="w-full flex flex-col items-center gap-5 md:gap-10 md:flex md:flex-row md:items-baseline md:justify-around md:flex-wrap">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="tutorialName" className="text-xl md:text-2xl">
                      Tutorial Name
                    </label>
                    <input
                      value={tutorialName}
                      onChange={(e) => setTutorialName(e.target.value)}
                      type="text"
                      name="tutorialName"
                      id="tutorialName"
                      placeholder="Enter The Tutorial Name"
                      className="w-[300px] md:w-[400px] p-2 rounded-lg outline-none bg-[#03045e] dark:bg-white text-white dark:text-black placeholder:text-slate-200 dark:placeholder:text-slate-500"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="urlLink" className="text-xl md:text-2xl">
                      URL Link
                    </label>
                    <input
                      value={urlLink}
                      onChange={(e) => setUrlLink(e.target.value)}
                      type="text"
                      name="urlLink"
                      id="urlLink"
                      placeholder="Enter The New URL"
                      className="w-[300px] md:w-[400px] p-2 rounded-lg outline-none bg-[#03045e] dark:bg-white text-white dark:text-black placeholder:text-slate-200 dark:placeholder:text-slate-500"
                    />
                  </div>
                  
                </div>

                <button
                 onClick={handelEditTutorial}
                 className="mt-10 font-semibold bg-[#03045e] dark:bg-white hover:bg-[#030447] dark:hover:bg-slate-200 text-white dark:text-black p-2 rounded-lg w-[200px] md:w-[300px]">
                  Update Tutorial
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center mt-10">
            <h2 className="text-2xl md:text-3xl text-center">
              Please select a tutorial to edit.
            </h2>
          </div>
        )}
      </div>

      {isModalOpen && (
        <DeleteModal
          title={`Delete Tutorial ${selectedTutorial}`}
          description="Are you sure you want to delete this tutorial? This action cannot be undone."
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
