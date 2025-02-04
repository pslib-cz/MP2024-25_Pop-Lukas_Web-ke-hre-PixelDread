using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PixelDread.DTO;
using PixelDread.Models;
using PixelDread.Services;
using System;
using System.Linq;
using System.Threading.Tasks;

[Route("api/post-articles")]
[ApiController]
public class PostArticleController : ControllerBase
{
    private readonly ApplicationContext _context;

    public PostArticleController(ApplicationContext context)
    {
        _context = context;
    }

    // ✅ Attach an article to a post
    [HttpPost("attach")]
    public async Task<IActionResult> AttachArticleToPost([FromBody] PostArticleDto postArticleDto)
    {
        var post = await _context.Posts.FindAsync(postArticleDto.PostId);
        var article = await _context.Articles.FindAsync(postArticleDto.ArticleId);

        if (post == null || article == null)
        {
            return NotFound("Post or Article not found.");
        }

        var articleType = article switch
        {
            ArticleText => ArticleType.Text,
            ArticleMedia => ArticleType.Media,
            ArticleLink => ArticleType.Link,
            ArticleFAQ => ArticleType.FAQ,
            _ => throw new ArgumentException("Invalid article type.")
        };

        var postArticle = new PostArticle
        {
            PostId = postArticleDto.PostId,
            ArticleId = postArticleDto.ArticleId,
            ArticleType = articleType, // ✅ Correctly set the ArticleType
            Order = postArticleDto.Order
        };

        _context.PostArticles.Add(postArticle);
        await _context.SaveChangesAsync();

        return Ok(postArticle);
    }

    // ✅ Remove an article from a post
    [HttpDelete("detach")]
    public async Task<IActionResult> DetachArticleFromPost([FromBody] PostArticleDto postArticleDto)
    {
        var postArticle = await _context.PostArticles
            .FirstOrDefaultAsync(pa => pa.PostId == postArticleDto.PostId && pa.ArticleId == postArticleDto.ArticleId);

        if (postArticle == null)
        {
            return NotFound("Article is not attached to this post.");
        }

        _context.PostArticles.Remove(postArticle);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // ✅ Get all articles attached to a post
    [HttpGet("post/{postId}")]
    public async Task<IActionResult> GetArticlesByPost(int postId)
    {
        var articles = await _context.PostArticles
            .Where(pa => pa.PostId == postId)
            .Include(pa => pa.Article)
            .ToListAsync();

        if (!articles.Any())
        {
            return NotFound("No articles found for this post.");
        }

        return Ok(articles);
    }
}
