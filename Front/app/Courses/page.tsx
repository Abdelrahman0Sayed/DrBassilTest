"use client";

import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import CoursesPage from "../Courses/CoursesPage";
import "../globals.css";

export default function Home() {



    return (
        <>
        <Navbar />
        <div className="min-h-screen w-full bg-[#EEEEEE] dark:bg-[#021526]">
            <CoursesPage />
        </div>
        <Footer />
        </>

    );
}
