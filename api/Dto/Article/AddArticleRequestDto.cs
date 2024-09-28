using System.ComponentModel.DataAnnotations;

namespace api.Dto.Article
{
    public class AddArticleRequestDto
    {
        [Required]
        public string? ArticleTitle { get; set; }
        
        [Required]
        public string? ArticleUrl { get; set; }
       
       
        public string? Description { get; set; }
       
     
        public string? ArticleImg { get; set; }

    }
}
