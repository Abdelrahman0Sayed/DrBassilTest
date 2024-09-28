using BassilApi.Models;

namespace api.Dto.Article
{
    public class AllArticlesResponseDto
    {
        public int TotalArticles { get; set; }
        public List<ArticleResponseDto>? Articles { get; set; }
    }
}
