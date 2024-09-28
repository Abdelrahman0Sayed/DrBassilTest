"use client";

import { useEffect, useState } from "react";


export default function UsersTable( table:{items : UsersResponse,searchQuery : string}) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") || "dark";
      setIsDarkMode(storedTheme === "dark");
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }
  }, [isDarkMode]);

  const tableItems = table.items.users.filter((item) =>{
    return item.studentName
    .toLowerCase()
    .includes(table.searchQuery.toLowerCase()) || 
    item.email
    .toLowerCase()
    .includes(table.searchQuery.toLowerCase())
  });

  return (
    <div className="w-[90%] flex justify-center  px-4 md:px-8">
      <div className="w-[90%] md:w-[70%] max-w-full shadow-sm border border-black dark:border-white rounded-lg overflow-x-auto dark:bg-[#021526] bg-[#EEEEEE]">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b border-black dark:border-white dark:bg-[#021526] dark:text-[#6EACDA]">
            <tr className="bg-[#03045e] dark:bg-white text-white
              dark:text-black">
              <th className="py-3 px-6">Username</th>
              <th className="py-3 px-6">Email</th>
            </tr>
          </thead>
          <tbody className="text-[#03045e] dark:text-[#6EACDA] divide-y divide-black dark:divide-white ">
            {tableItems.map((item, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">{item.studentName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
