"use client";

import { useState } from 'react';
import Sidebar from "./Sidebar";
import Users from "./Users/Users";
import Courses from "./Courses/Courses";
import Landing from "./Landing";
import EditCourse from './Courses/EditCourse';
import Articles from './Articles/Articles';
import EditArticle from './Articles/EditArticle';
import Books from './Books/Books';
import EditBook from './Books/EditBook';
import Add from './Add/Add';
import { UserService } from '../Services/UserService';

export default function Page() {
    const [currentView, setCurrentView] = useState('landing');
    const [courseToEdit, setCourseToEdit] = useState<CourseRequest>();
    const [bookToEdit, setBookToEdit] = useState<getBookResponse>();
    const [articleToEdit, setArticleToEdit] = useState<getArticleResponse>();
    const renderContent = () => {
        switch (currentView) {
            case 'users':
                return <Users />;
            case 'courses':
                return <Courses setCurrentView={setCurrentView} setCourseToEdit={setCourseToEdit} />;
            case 'editCourse':
                return <EditCourse courseName={courseToEdit?.courseName ?? ""} grade={courseToEdit?.grade ?? ""} courseType={ courseToEdit?.courseType?? ""} tutorials={0} courseImg={courseToEdit?.courseImg?? ""}   />;
            case 'articles':
                return <Articles setCurrentView={setCurrentView} setArticleToEdit={setArticleToEdit} />;
            case 'editArticle':
                return <EditArticle articleUrl={articleToEdit?.articleUrl ?? ''} articleImg={articleToEdit?.articleImg ?? ''} title={articleToEdit?.title ?? ''} description={articleToEdit?.description ?? ''} />;
            case 'books':
                return <Books setCurrentView={setCurrentView} setBookToEdit={setBookToEdit} />;
            case 'editBook':
                return <EditBook bookId={bookToEdit?.bookId??0} url={bookToEdit?.url ?? ''} title={bookToEdit?.title ?? ''} description={bookToEdit?.description ?? ''} coverImage={bookToEdit?.coverImage ?? ''} chapters={bookToEdit?.chapters ?? 0} pages={bookToEdit?.pages ?? 0} />;
            case 'add':
                return <Add />;
            default:
                return <Landing />;
        }
    };
    const userService = new UserService();
    if(userService.getUserDetails().role !== 'Admin'){
        window.location.href = '/'
        return;
    }
    return (
        <>
        <div className="flex gap-20 w-full ">
            <Sidebar setCurrentView={setCurrentView} />
            <div className="ml-20 md:ml-32 w-full mt-12 flex">
                {renderContent()}
            </div>
        </div>
        </>
    );
}
