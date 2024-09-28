import CoursesTable from "./CoursesTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { AdminService } from "@/app/Services/AdminService";
import { useEffect, useState } from "react";

export default function Tutorials(setActiveComponent : { setActiveComponent: any , setCourseToAddTutorial: any }) {
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
            <h1 className="w-[90%] md:w-full text-2xl text-center md:text-4xl">
                Select a course to add a tutorial to it
            </h1>
            <div className="flex flex-col gap-5 w-[85%] md:w-[60%]">
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
            <CoursesTable setActiveComponent={setActiveComponent.setActiveComponent} setCourseToAddTutorial={setActiveComponent.setCourseToAddTutorial} search={search} items={courses} />
        </div>
    );
}
