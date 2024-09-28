using api.Dto.Article;
using Microsoft.Identity.Client;

namespace api.Interfaces
{
    public interface IArticleServices
    {
        public AllArticlesResponseDto GetAllArticles();
        public List<ArticleResponseDto> GetArticle(string title);
        public Task<string> AddArticle(AddArticleRequestDto addArticleRequest);
        public Task<bool> EditArticle(UpdateArticleRequestDto updatedRequest);
        public Task<bool> DeleteArticle(string ArticleTitle);

    }
}
