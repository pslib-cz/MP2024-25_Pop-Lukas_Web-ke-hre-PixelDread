using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PixelDread.DTO;
using PixelDread.Models;
using PixelDread.Services;
using System;
using System.Threading.Tasks;

[Route("api/articles")]
[ApiController]
public class ArticleController : ControllerBase
{
    private readonly ApplicationContext _context;

    public ArticleController(ApplicationContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> CreateArticle([FromBody] CreateArticleDto articleDto)
    {
        if (articleDto == null)
            return BadRequest("Invalid article data.");

        Article article;

        switch (articleDto.Type)
        {
            case ArticleType.Text:
                if (string.IsNullOrWhiteSpace(articleDto.Content))
                    return BadRequest("Content is required for text articles.");
                article = new ArticleText { Content = articleDto.Content };
                break;

            case ArticleType.Media:
                if (articleDto.FileInformationsId == null)
                    return BadRequest("FileInformationsId is required for media articles.");
                article = new ArticleMedia
                {
                    FileInformationsId = articleDto.FileInformationsId.Value,
                    Description = articleDto.Description,
                    Alt = articleDto.Alt
                };
                break;

            case ArticleType.Link:
                if (string.IsNullOrWhiteSpace(articleDto.Url))
                    return BadRequest("URL is required for link articles.");
                article = new ArticleLink { url = articleDto.Url, placeholder = articleDto.Placeholder };
                break;

            case ArticleType.FAQ:
                if (string.IsNullOrWhiteSpace(articleDto.Question) || string.IsNullOrWhiteSpace(articleDto.Answer))
                    return BadRequest("Both question and answer are required for FAQ articles.");
                article = new ArticleFAQ { Question = articleDto.Question, Answer = articleDto.Answer };
                break;

            default:
                return BadRequest("Invalid article type.");
        }

        _context.Articles.Add(article);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetArticleById), new { id = article.Id }, article);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetArticleById(int id)
    {
        var article = await _context.Articles.FindAsync(id);
        if (article == null)
        {
            return NotFound("Article not found.");
        }

        return Ok(article);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllArticles()
    {
        var articles = await _context.Articles.ToListAsync();
        return Ok(articles);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateArticle(int id, [FromBody] CreateArticleDto articleDto)
    {
        var article = await _context.Articles.FindAsync(id);
        if (article == null)
        {
            return NotFound("Article not found.");
        }

        switch (article)
        {
            case ArticleText textArticle:
                if (string.IsNullOrWhiteSpace(articleDto.Content))
                    return BadRequest("Content is required for text articles.");
                textArticle.Content = articleDto.Content;
                break;

            case ArticleMedia mediaArticle:
                if (articleDto.FileInformationsId == null)
                    return BadRequest("FileInformationsId is required for media articles.");
                mediaArticle.FileInformationsId = articleDto.FileInformationsId.Value;
                mediaArticle.Description = articleDto.Description;
                mediaArticle.Alt = articleDto.Alt;
                break;

            case ArticleLink linkArticle:
                if (string.IsNullOrWhiteSpace(articleDto.Url))
                    return BadRequest("URL is required for link articles.");
                linkArticle.url = articleDto.Url;
                linkArticle.placeholder = articleDto.Placeholder;
                break;

            case ArticleFAQ faqArticle:
                if (string.IsNullOrWhiteSpace(articleDto.Question) || string.IsNullOrWhiteSpace(articleDto.Answer))
                    return BadRequest("Both question and answer are required for FAQ articles.");
                faqArticle.Question = articleDto.Question;
                faqArticle.Answer = articleDto.Answer;
                break;

            default:
                return BadRequest("Invalid article type.");
        }

        await _context.SaveChangesAsync();
        return Ok(article);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteArticle(int id)
    {
        var article = await _context.Articles.FindAsync(id);
        if (article == null)
        {
            return NotFound("Article not found.");
        }

        _context.Articles.Remove(article);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPost("{articleId}/attach-to-post/{postId}")]
    public async Task<IActionResult> AttachArticleToPost(int articleId, int postId, [FromBody] int order)
    {
        var article = await _context.Articles.FindAsync(articleId);
        var post = await _context.Posts.FindAsync(postId);

        if (article == null || post == null)
        {
            return NotFound("Article or Post not found.");
        }

        var postArticle = new PostArticle
        {
            PostId = postId,
            ArticleId = articleId,
            ArticleType = article switch
            {
                ArticleText => ArticleType.Text,
                ArticleMedia => ArticleType.Media,
                ArticleLink => ArticleType.Link,
                ArticleFAQ => ArticleType.FAQ,
                _ => throw new ArgumentException("Invalid article type.")
            },
            Order = order
        };

        _context.PostArticles.Add(postArticle);
        await _context.SaveChangesAsync();

        return Ok(postArticle);
    }
}
