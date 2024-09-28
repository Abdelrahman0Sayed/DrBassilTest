using System.ComponentModel.DataAnnotations;

namespace api.Dto.Book
{
    public class AddBookRequestDto
    {
        [Required]
        public string? BookTitle { get; set; }

        
        public string? Description { get; set; }

        [Required]
        public string? BookLink { get; set; }

        
        public int Chapeters { get; set; }

        
        public int Pages { get; set; }

        
        public string? BookImg { get; set; }
    }
}
