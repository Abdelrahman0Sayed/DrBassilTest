import UsersTable from "./UsersTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { AdminService } from "@/app/Services/AdminService";

export default function Users() {
    const adminService = new AdminService();
    const [users, setUsers] = useState<UsersResponse>({ totalUsers: 0, users: [] });
    const [searchQuery, setSearchQuery] = useState<string>('');
    useEffect(() => {
        async function fetchUsers() {
            setUsers(await adminService.getUsers() || { totalUsers: 0, users: [] });
        }
        fetchUsers();
    }, []);
    return (
        <div className="w-full flex flex-col items-center gap-10 text-[#03045e] dark:text-[#6EACDA]">
            <h1 className="text-3xl md:text-4xl">
                Our Users
            </h1>
            <div className="flex flex-col gap-5 w-[85%] md:w-[60%]">
                <h1 className="text-[#03045e] dark:text-[#6EACDA] text-xl md:text-2xl">
                    Total Users: <span className="text-black dark:text-white">{users.totalUsers}</span>
                </h1>
                <div className="relative w-[50%]">
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-200 dark:text-slate-500"
                    />
                    <input
                        className="w-full rounded-lg bg-[#03045e] dark:bg-white text-white dark:text-black dark:outline-none outline-none py-2 pl-10 pr-4 placeholder:text-slate-200 dark:placeholder:text-slate-500"
                        placeholder="Search for a user"
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            <UsersTable items={users} searchQuery={searchQuery}  />
        </div>
    );
}
