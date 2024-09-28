using api.Dto.Book;
using api.Interfaces;
using BassilApi.data;
using BassilApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookServices _bookServices;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;
        public BookController(IBookServices bookServices, UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _bookServices = bookServices;
            _context = context;
        }
        [Authorize(Policy ="AllUsersPolicy")]
        [HttpGet("GetAllBooks")]
        public IActionResult GetAllBooks()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = _bookServices.GetAllBooks();
            return Ok(response);
        }

        [Authorize(Policy ="AllUsersPolicy")]
        [HttpPost("GetBook")]
        public async Task<IActionResult> GetBook(string bookName)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var book = _context.Books.Where(x => x.Title.Contains(bookName));
            return Ok(book);
        }

        [Authorize(Policy = "AdminPolicy")]
        [HttpPost("AddBook")]
        public async Task<IActionResult> AddBook(AddBookRequestDto newBook)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _bookServices.AddBook(newBook);
            if (response != "")
                return BadRequest(response);

            return Ok();

        }

        [Authorize(Policy = "AdminPolicy")]
        [HttpPut("EditBook")]
        public async Task<IActionResult> EditBookAsync(UpdateBookRequestDto updateBook)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _bookServices.EditBook(updateBook);
            if (!response)
                return BadRequest("Book Not Found");

            return Ok();
        }

        [Authorize(Policy = "AdminPolicy")]
        [HttpDelete("DeleteBook")]
        public async Task<IActionResult> DeleteBookAsync(string BookName)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _bookServices.DeleteBook(BookName);
            if (!response)
                return BadRequest("Book isn't found");

            return Ok();
        }
    }
}
