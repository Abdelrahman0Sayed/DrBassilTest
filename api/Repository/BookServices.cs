using api.Dto.Book;
using api.Interfaces;
using api.Models;
using BassilApi.data;
using BassilApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace api.Repository
{
    public class BookServices : IBookServices
    {
        public readonly UserManager<ApplicationUser> _userManager;
        public readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;
        
        public BookServices(UserManager<ApplicationUser> userManager, ApplicationDbContext context ,IWebHostEnvironment environment)
        {
            _userManager = userManager;
            _context = context;
            _environment = environment;
        }

        public async Task<string> AddBook(AddBookRequestDto dto)
        {
            var book = await _context.Books.FirstOrDefaultAsync(x => x.Title == dto.BookTitle);
            if (book != null)
                return "Book is already exist.";

            var newBook = new Book
            {
                Chapters = dto.Chapeters,
                Pages = dto.Pages,
                Title = dto.BookTitle,
                Url = dto.BookLink,
                Description = dto.Description
            };
            if (!dto.BookImg.IsNullOrEmpty())
            {
                var decodedimg = CourseServices.DecodeBase64String(dto.BookImg);
                var uploadingFolder = Path.Combine(_environment.WebRootPath, "uploads/Books");

                if (!Directory.Exists(uploadingFolder))
                {
                    try
                    {
                        Directory.CreateDirectory(uploadingFolder);
                    }
                    catch
                    {
                        throw new IOException("Can't Create uploading folder.");
                    }
                }

                var ImagePath = Path.Combine(uploadingFolder, $"{Guid.NewGuid().ToString() + "-" + dto.BookTitle + ".png"}");
                await CourseServices.SaveImageToFileSystem(decodedimg, ImagePath);
                newBook.CoverImage = $"http://localhost:5035/uploads/Books/{ImagePath.Split("\\").Last()}";
            }
            else
            {
                newBook.CoverImage = "data:image/png;base64,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";
            }
            await _context.Books.AddAsync(newBook);
            await _context.SaveChangesAsync();

            return "";
        }

        public async Task<bool> DeleteBook(string BookTitle)
        {
            var book = await _context.Books.FirstOrDefaultAsync(x => x.Title == BookTitle);
            if (book is null)
                return false;

            _context.Books.Remove(book);
            deleteImage(book.CoverImage);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> EditBook(UpdateBookRequestDto dto)
        {
            var book = await _context.Books.FirstOrDefaultAsync(x => x.Title == dto.CurrentBookTitle);
            if (book is null)
                return false;

            book.Title = dto.UpdatedBookTitle != null ? dto.UpdatedBookTitle : book.Title;
            book.Description = dto.UpdatedDescription != null ? dto.UpdatedDescription : book.Description;
            book.Url = dto.UpdatedBookUrl != null ? dto.UpdatedBookUrl : book.Url;
            book.Pages = dto.UpdatedPages != 0 ? dto.UpdatedPages : book.Pages;
            book.Chapters = dto.UpdatedChapters != 0 ? dto.UpdatedChapters : book.Chapters;

            if (!dto.UpdatedBookImg.IsNullOrEmpty() && dto.UpdatedBookImg.Contains("data:image"))
            {
                var image = CourseServices.DecodeBase64String(dto.UpdatedBookImg);

                var courseUploadsFolder = Path.Combine(_environment.WebRootPath, "uploads/Courses");
                if (!Directory.Exists(courseUploadsFolder))
                {
                    try
                    {
                        Directory.CreateDirectory(courseUploadsFolder);
                    }
                    catch
                    {
                        throw new IOException("Can't create the Folder.");
                    }
                }
                var imagePath = Path.Combine(courseUploadsFolder, Guid.NewGuid().ToString() + "-" + dto.UpdatedBookTitle + ".png");
                await CourseServices.SaveImageToFileSystem(image, imagePath);
                deleteImage(book.CoverImage);
                book.CoverImage = $"http://localhost:5035/uploads/Courses/{imagePath.Split("\\").Last()}";
                await _context.SaveChangesAsync();
                return true;
            }
            await _context.SaveChangesAsync();

            return true ;
        }

        public AllBooksResponseDto GetAllBooks()
        {
            var response = new AllBooksResponseDto
            {
                TotalBooks = _context.Books.Count(),
                Books = _context.Books.ToList()
            };
            return response;
        }
        // Get Book Wrote directly in the end-point.
        public void deleteImage(string imagePath)
        {
            if (string.IsNullOrEmpty(imagePath))
                return;
            var imageName = imagePath.Split("/").Last();
            var pyhsicalPath = Path.Combine(_environment.WebRootPath, "uploads/Courses", imageName);
            if (System.IO.File.Exists(pyhsicalPath))
            {
                System.IO.File.Delete(pyhsicalPath);
            }
        }
    }
}
