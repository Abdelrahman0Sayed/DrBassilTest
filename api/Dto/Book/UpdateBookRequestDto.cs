using System.ComponentModel.DataAnnotations;

namespace api.Dto.Book
{
    public class UpdateBookRequestDto
    {
        [Required]
        public string? CurrentBookTitle { get; set; }

        public string? UpdatedBookTitle { get; set; }
        public string? UpdatedBookUrl { get; set; }
        public string? UpdatedDescription { get; set; }
        public int UpdatedChapters { get; set; }
        public int UpdatedPages { get; set; }
        public string? UpdatedBookImg { get; set; }
    }
}
