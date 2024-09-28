import BooksTable from "./BooksTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { AdminService } from "@/app/Services/AdminService";
import { useEffect, useState } from "react";

export default function Books(setCurrentView: { setCurrentView: any , setBookToEdit: any}) {
    const adminService = new AdminService();
    const [search, setSearch] = useState("");
    const [books, setBooks] = useState<BooksResponse>({ totalBooks: 0, books: [] });
    useEffect(() => {
        function getBooks() {
            adminService.getBooks().then((response) => {
                setBooks(response ?? { totalBooks: 0, books: [] });
            });
        }
        getBooks();
    }, []);
    return (
        <div className="w-full flex flex-col items-center gap-10 text-[#03045e] dark:text-[#6EACDA]">
            <h1 className="text-3xl md:text-4xl">
                Our Books
            </h1>
            <div className="flex flex-col gap-5 w-[85%] md:w-[60%]">
                    <h1 className="text-[#03045e] dark:text-[#6EACDA] text-xl md:text-2xl">
                        Total Books: <span className="text-black dark:text-white">{books.totalBooks}</span>
                    </h1>  
                <div className="relative w-full md:w-[50%]">
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-200 dark:text-slate-500"
                    />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg bg-[#03045e] dark:bg-white text-white dark:text-black dark:outline-none outline-none py-2 pl-10 pr-4 placeholder:text-slate-200 dark:placeholder:text-slate-500"
                        placeholder="Search for a book"
                        type="search"
                    />
                </div>
            </div>
            <BooksTable setCurrentView={setCurrentView.setCurrentView} table={books} search={search} setbookToEdit={setCurrentView.setBookToEdit} setBooks={setBooks} />
        </div>
    );
}
