namespace api.Dto.Article
{
    public class UpdateArticleRequestDto
    {
        public string? CurrentArticleTitle {get; set;}
        public string? UpdatedArticleTitle {get; set;}
        public string? UpdatedArticleUrl {get; set;}
        public string? UpdatedDescription {get; set;}
        public string? UpdatedArticleImg {get; set;}
    }
}
