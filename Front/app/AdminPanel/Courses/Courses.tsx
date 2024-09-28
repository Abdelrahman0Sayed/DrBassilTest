import CoursesTable from "./CoursesTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { AdminService } from "@/app/Services/AdminService";

export default function Courses(setCurrentView : { setCurrentView: any  , setCourseToEdit: any}) {
    const [search, setSearch] = useState<string>('');
    const [courses , setCourses] = useState<CoursesResponse>({ totalCourses: 0, totalTutorials: 0, courses: [] });
    const adminService = new AdminService();
    useEffect(() => {
        async function fetchCourses() {
            setCourses(await adminService.getCourses() || { totalCourses: 0, totalTutorials: 0, courses: [] });
        }
        fetchCourses();
    }, []);
    return (
        <div className="w-full flex flex-col items-center gap-10 text-[#03045e] dark:text-[#6EACDA]">
            <h1 className="text-3xl md:text-4xl">
                Our Courses
            </h1>
            <div className="flex flex-col gap-5 w-[85%] md:w-[60%]">
                <div className="flex flex-col md:flex md:flex-row gap-3 md:gap-0 justify-normal md:justify-between">
                    <h1 className="text-[#03045e] dark:text-[#6EACDA] text-xl md:text-2xl">
                        Total Courses: <span className="text-black dark:text-white">{courses.totalCourses}</span>
                    </h1>
                    <h1 className="text-[#03045e] dark:text-[#6EACDA] text-xl md:text-2xl">
                        Total Tutorials: <span className="text-black dark:text-white">{courses.totalTutorials}</span>
                    </h1>   
                </div>
                <div className="relative w-full md:w-[50%]">
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-200 dark:text-slate-500"
                    />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg bg-[#03045e] dark:bg-white text-white dark:text-black dark:outline-none outline-none py-2 pl-10 pr-4 placeholder:text-slate-200 dark:placeholder:text-slate-500"
                        placeholder="Search for a course"
                        type="search"
                    />
                </div>
            </div>
            <CoursesTable  setCurrentView={setCurrentView.setCurrentView} items={courses} search={search} setCourseToEdit={setCurrentView.setCourseToEdit} setItems={setCourses} />
        </div>
    );
}
