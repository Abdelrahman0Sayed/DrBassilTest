using api.Dto.Article;
using api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Bcpg.OpenPgp;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IArticleServices _articleServices;

        public ArticleController(IArticleServices articleServices)
        {
            _articleServices = articleServices;
        }

        [Authorize(Policy ="AllUsersPolicy")]
        [HttpGet("GetAllArticles")]
        public IActionResult GetAllArticles()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = _articleServices.GetAllArticles();
            return Ok(response);
        }

        [Authorize(Policy = "AllUsersPolicy")]
        [HttpPost("GetArticle")]
        public IActionResult GetArticle(string articleTitle)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = _articleServices.GetArticle(articleTitle);
            return Ok(response);
        }

        [Authorize(Policy = "AdminPolicy")]
        [HttpPost("AddArticle")]
        public async Task<IActionResult> AddArticleAsync(AddArticleRequestDto newArticle)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _articleServices.AddArticle(newArticle);
            if (response != "")
                return BadRequest(response);

            return Ok();
        }



        [Authorize(Policy = "AdminPolicy")]
        [HttpPut("EditArticle")]
        public async Task<IActionResult> EditArticleAsync(UpdateArticleRequestDto editRequest)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _articleServices.EditArticle(editRequest);
            if (!response)
                return BadRequest("Article isn't found");

            return Ok();
        }

        [Authorize(Policy = "AdminPolicy")]
        [HttpDelete("DeleteArticle")]
        public async Task<IActionResult> DeleteArticleAsync(string ArticleTitle)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _articleServices.DeleteArticle(ArticleTitle);
            if (!response)
                return BadRequest("Article isn't found");

            return Ok();
        }
    }
}
