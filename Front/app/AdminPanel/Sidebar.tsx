"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Avatar from "@radix-ui/react-avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faNewspaper, faBook, faChalkboard, faArrowRightFromBracket, faHouse, faGear, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { UserService } from "../Services/UserService";


const Sidebar = ({ setCurrentView }: { setCurrentView: (view: string) => void }) => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const userServcie = new UserService();
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedTheme = localStorage.getItem("theme") || "dark";
            setIsDarkMode(storedTheme === "dark");
            document.documentElement.classList.toggle("dark", storedTheme === "dark");
        }
    }, []);

    const setDarkMode = () => {
        setIsDarkMode(true);
        localStorage.setItem("theme", "dark");
    };

    const setLightMode = () => {
        setIsDarkMode(false);
        localStorage.setItem("theme", "light");
    };

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") || "dark";   
        document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }, [isDarkMode]);

    const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === "dark") {
            setDarkMode();
        } else if (event.target.value === "light") {
            setLightMode();
        }
    };

    const navigation = [
        { href: "#", name: "Users", icon: faUser, view: 'users' },
        { href: "#", name: "Courses", icon: faChalkboard, view: 'courses' },
        { href: "#", name: "Books", icon: faBook, view: 'books' },
        { href: "#", name: "Articles", icon: faNewspaper, view: 'articles' },
        { href: "#", name: "Add New", icon: faSquarePlus, view: 'add' },
    ];

    const navsFooter = [
        { href: "/", name: "Back to Home", icon: faHouse },
    ];

    return (
        <nav className="fixed top-0 left-0 w-20 h-full border-r border-black dark:border-white dark:bg-[#021526] bg-[#EEEEEE] space-y-8">
            <div className="flex flex-col h-full">
                <div className="h-20 flex items-center justify-center px-8">
                    <h1 className="font-semibold dark:text-[#6EACDA] text-[#03045e]">
                        Admin <br />
                        Panel
                    </h1>
                </div>
                <div className="flex-1 flex flex-col h-full">
                    <ul className="px-4 text-sm font-medium flex-1">
                        {navigation.map((item, idx) => (
                            <li key={idx}>
                                <a
                                    className="relative flex items-center justify-center gap-x-2 dark:text-[#6EACDA] text-[#03045e] p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 duration-150 group"
                                    onClick={() => item.view && setCurrentView(item.view)}
                                >
                                    <div className="dark:text-[#6EACDA] text-[#03045e] text-xl">
                                        <FontAwesomeIcon icon={item.icon} />
                                    </div>
                                    <span className="absolute left-14 p-1 px-1.5 rounded-md whitespace-nowrap text-xs text-white bg-gray-800 hidden group-hover:inline-block group-focus:hidden duration-150">
                                        {item.name}
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div>
                        <ul className="px-4 text-sm font-medium flex-1">
                            {navsFooter.map((item, idx) => (
                                <li key={idx}>
                                    <a
                                        href={item.href}
                                        className="relative flex items-center justify-center gap-x-2 dark:text-[#6EACDA] text-[#03045e] p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 duration-150 group"
                                    >
                                        <div className="dark:text-[#6EACDA] text-[#03045e] text-xl">
                                            <FontAwesomeIcon icon={item.icon} />
                                        </div>
                                        <span className="absolute left-14 p-1 px-1.5 rounded-md whitespace-nowrap text-xs text-white bg-gray-800 hidden group-hover:inline-block group-focus:hidden duration-150">
                                            {item.name}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="relative py-4 px-4 border-t border-black dark:border-white">
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger className="outline-none flex justify-center w-full">
                                    <Avatar.Root>
                                        <FontAwesomeIcon icon={faGear} className="dark:text-[#6EACDA] text-[#03045e] text-2xl" />
                                    </Avatar.Root>
                                </DropdownMenu.Trigger>

                                <DropdownMenu.Portal>
                                    <DropdownMenu.Content className="absolute bottom-4 left-10 w-64 rounded-lg dark:bg-[#021526] bg-white shadow-md border text-sm dark:text-[#6EACDA] text-gray-600 p-2">
                                        <span className="block text-gray-500/80 p-2">
                                            mstbassel@yahoo.com
                                        </span>
                                        <DropdownMenu.Item asChild className="outline-none"></DropdownMenu.Item>

                                        <div className="relative rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 duration-150">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="w-4 h-4 absolute right-1 inset-y-0 my-auto pointer-events-none"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <select
                                                className="w-full cursor-pointer appearance-none bg-transparent p-2 outline-none dark:bg-[#021526] bg-[#EEEEEE]"
                                                onChange={handleThemeChange}
                                                defaultValue="Theme"
                                            >
                                                <option disabled className="dark:bg-[#021526] bg-[#EEEEEE]">
                                                    Theme
                                                </option>
                                                <option value="dark" className="dark:bg-[#021526] bg-[#EEEEEE]">
                                                    Dark
                                                </option>
                                                <option value="light" className="dark:bg-[#021526] bg-[#EEEEEE]">
                                                    Light
                                                </option>
                                            </select>
                                        </div>
                                        <DropdownMenu.Item asChild className="outline-none">
                                            <button 
                                            onClick={() => {
                                                userServcie.logout();
                                                window.location.href = '/';
                                            }}
                                            className="block w-full p-2 text-left rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 duration-150">
                                                Logout
                                            </button>
                                        </DropdownMenu.Item>
                                    </DropdownMenu.Content>
                                </DropdownMenu.Portal>
                            </DropdownMenu.Root>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
