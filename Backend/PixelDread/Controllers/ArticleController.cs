using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PixelDread.Models;
using PixelDread.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PixelDread.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public ArticleController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/Article
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Article>>> GetArticles()
        {
            // Returns all articles (TPH: table-per-hierarchy).
            var articles = await _context.Articles.ToListAsync();
            return Ok(articles);
        }

        // GET: api/Article/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Article>> GetArticle(int id)
        {
            var article = await _context.Articles.FindAsync(id);
            if (article == null)
            {
                return NotFound();
            }
            return Ok(article);
        }

        // GET: api/Article/by-post/{postId}
        // Updated to do manual projection so subtypes return their unique properties.
        [HttpGet("by-post/{postId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetArticlesByPostId(int postId)
        {
            var articles = await _context.Articles
                .Where(a => a.PostId == postId)
                .ToListAsync();

            if (articles == null || !articles.Any())
            {
                return NotFound($"No articles found for post with ID {postId}.");
            }

            // Map each base Article to an anonymous object with a "Type" and the relevant fields
            var result = articles.Select<Article, object>(a =>
{
    switch (a)
    {
        case ArticleFAQ faq:
            return new
            {
                Type = "faq",
                faq.Id,
                faq.PostId,
                faq.Question,
                faq.Answer
            };
        case ArticleLink link:
            return new
            {
                Type = "link",
                link.Id,
                link.PostId,
                link.Url,
                link.Placeholder
            };
        case ArticleText text:
            return new
            {
                Type = "text",
                text.Id,
                text.PostId,
                text.Content
            };
        case ArticleMedia media:
            return new
            {
                Type = "media",
                media.Id,
                media.PostId,
                media.Description,
                media.Alt
            };
        default:
            // Fallback if a new subtype is introduced but not handled
            return new
            {
                Type = "unknown",
                a.Id,
                a.PostId
            };
    }
});

            return Ok(result);
        }
    }
}
