import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';


interface CoursesProps {
    courses: CourseRequest[];
}

const Courses: React.FC<CoursesProps> = ({ courses }) => {
    return (
        <section dir="ltr" className="py-5 bg-[#EEEEEE] dark:bg-[#021526] text-[#03045e] dark:text-[#6EACDA]">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                    {
                        courses.map((item) => (
                            <li className="w-full mx-auto group sm:max-w-sm" key={item.courseName}>
                                <Link href={`/Courses/${item.courseName}`} passHref>
                                    <div className="block rounded-lg overflow-hidden shadow-lg bg-white dark:bg-[#1E2A38]">
                                        <img src={item.courseImg} loading="lazy" alt={item.courseName} className="w-full h-64 object-cover" />
                                        <div className="p-4 space-y-4">
                                            <span className="block text-indigo-600 dark:text-[#6EACDA] text-sm font-semibold">{item.courseType}</span>
                                            <h3 className="text-lg text-gray-800 dark:text-white duration-150 group-hover:text-indigo-600 dark:group-hover:text-[#6EACDA] font-semibold">
                                                {item.courseName}
                                            </h3>
                                            <div className="flex gap-3 items-center mt-2">
                                                <FontAwesomeIcon icon={faLayerGroup} className="text-indigo-600 dark:text-[#6EACDA]" />
                                                <span className="text-sm text-gray-800 dark:text-[#E2E2E2] font-semibold">{item.tutorials} Lectures</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>
    );
}

export default Courses;
