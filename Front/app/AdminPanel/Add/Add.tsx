"use client";

import { useState } from "react";
import Navigator from "./Navigator";
import AddCourse from "./AddCourse";
import AddBook from "./AddBook";
import AddArticle from "./AddArticle";
import Tutorials from "./Tutorials";
import AddTutorial from "./AddTutorial";
import Landing from "./Landing";

export default function Add() {
    const [activeComponent, setActiveComponent] = useState<string | null>(null);
    const [courseName, setCourseName] = useState<string | null>(null);
    const renderComponent = () => {
        switch (activeComponent) {
            case "Add Course":
                return <AddCourse />;
            case "Add Book":
                return <AddBook />;
            case "Add Article":
                return <AddArticle />;
            case "Tutorials":
                return <Tutorials setActiveComponent={setActiveComponent} setCourseToAddTutorial={setCourseName} />;
            case "Add Tutorial":
                return <AddTutorial courseName={courseName?? ""} />;
            default:
                return <Landing />;
        }
    };

    return (
        <div className="w-full flex flex-col items-center gap-10 text-[#03045e] dark:text-[#6EACDA]">
            <Navigator setActiveComponent={setActiveComponent} />
            {renderComponent()}
        </div>
    );
}
