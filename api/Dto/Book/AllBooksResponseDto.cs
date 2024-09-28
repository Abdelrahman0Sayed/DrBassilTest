using BassilApi.Models;

namespace api.Models;

public class AllBooksResponseDto
{
    public int TotalBooks { get; set; }
    public List<Book>? Books { get; set; }
}
