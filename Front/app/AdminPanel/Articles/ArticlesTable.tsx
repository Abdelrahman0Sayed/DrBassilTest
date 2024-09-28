"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ArticleImg1 from "../../Assets/Images/Article1.jpg";
import ArticleImg2 from "../../Assets/Images/Article2.jpg";
import DeleteModal from "../../Components/DeleteModal";
import { AdminService } from "@/app/Services/AdminService";

type ArticleTableProps = {
  setCurrentView: (view: string) => void;
  table : ArticlesResponse
  setArticles : any
  search : string
  setArticleToEdit:any;
};


export default function ArticlesTable({ setCurrentView ,table ,setArticles,search ,setArticleToEdit}: ArticleTableProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<getArticleResponse | null>(null);
  const adminService = new AdminService();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") || "dark";
      setIsDarkMode(storedTheme === "dark");
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }
  }, [isDarkMode]);

  let ArticleItems : getArticleResponse[] = table.articles.filter((item) => {
    return item.title.toLowerCase().includes(search.toLowerCase());
  });

  const handleEditClick = (article : getArticleResponse) => {
    setArticleToEdit(article);
    setCurrentView("editArticle");
  };

  const handleDeleteClick = (article: getArticleResponse) => {
    setArticleToDelete(article);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if(!articleToDelete) return;
    adminService.deleteArticle(articleToDelete.title).then(() => {
      setArticles((prev: ArticlesResponse) => {
        return {
          totalArticles: prev.totalArticles - 1,
          articles: prev.articles.filter((item) => item.title !== articleToDelete.title),
        };
      });
    });
    setIsModalOpen(false);
  };

  return (
    <div className="w-[90%] flex justify-center px-4 md:px-8">
      <div className="w-[90%] md:w-[70%] max-w-full shadow-sm border border-black dark:border-white rounded-lg overflow-x-auto dark:bg-[#021526] bg-[#EEEEEE]">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b border-black dark:border-white dark:bg-[#021526] dark:text-[#6EACDA]">
            <tr className="bg-[#03045e] dark:bg-white text-white dark:text-black">
              <th className="py-3 px-6">Title</th>
              <th className="py-3 px-6">Url</th>
              <th className="py-3 px-6">Photo</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="text-[#03045e] dark:text-[#6EACDA] divide-y divide-black dark:divide-white">
            {ArticleItems.map((item, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a href={item.articleUrl} target="_blank" rel="noopener noreferrer">
                    {item.articleUrl}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={item.articleImg}
                    alt="Image"
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                </td>
                <td className="px-6 py-4 flex gap-4 items-center mt-7">
                  <button
                    className="text-xl text-green-500 hover:text-green-600 h-full flex items-center justify-center"
                    onClick={() => handleEditClick(item)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button
                    className="text-xl text-red-500 hover:text-red-600 h-full flex items-center justify-center"
                    onClick={() => handleDeleteClick(item)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        description={`Are you sure you want to delete ${articleToDelete?.title}?`}
      />
    </div>
  );
}
