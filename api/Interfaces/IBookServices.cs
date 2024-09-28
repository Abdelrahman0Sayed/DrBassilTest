using api.Dto.Book;
using api.Models;

namespace api.Interfaces
{
    public interface IBookServices
    {
        public AllBooksResponseDto GetAllBooks();
        public Task<string> AddBook(AddBookRequestDto addBookRequest);
        public Task<bool> EditBook(UpdateBookRequestDto updatedBook);
        public Task<bool> DeleteBook(string BookTitle);
    }
}
