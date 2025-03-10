using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PixelDread.DTO;
using PixelDread.Models;
using PixelDread.Services;

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
                return NoContent();
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
                media.FileInformationsId,
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

        // PUT: api/Article/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]

        public async Task<IActionResult> UpdateArticle(int id, [FromForm] ArticleDto articleDto)
        {
            var article = await _context.Articles.FindAsync(id);
            if (article == null)
            {
                return NotFound();
            }

            // Aktualizace podle typu článku
            switch (articleDto.Type)
            {
                case ArticleType.Text:
                    if (article is ArticleText textArticle)
                    {
                        textArticle.Content = articleDto.Content ?? "";
                    }
                    else
                    {
                        return BadRequest("Článek není typu Text.");
                    }
                    break;
                case ArticleType.FAQ:
                    if (article is ArticleFAQ faqArticle)
                    {
                        faqArticle.Question = articleDto.Question ?? "";
                        faqArticle.Answer = articleDto.Answer ?? "";
                    }
                    else
                    {
                        return BadRequest("Článek není typu FAQ.");
                    }
                    break;
                case ArticleType.Link:
                    if (article is ArticleLink linkArticle)
                    {
                        linkArticle.Url = articleDto.Url ?? "";
                        linkArticle.Placeholder = articleDto.Placeholder;
                    }
                    else
                    {
                        return BadRequest("Článek není typu Link.");
                    }
                    break;
                case ArticleType.Media:
                    if (article is ArticleMedia mediaArticle)
                    {
                        mediaArticle.Description = articleDto.Description ?? "";
                        mediaArticle.Alt = articleDto.Alt ?? "";
                        if (articleDto.FileInformationsId.HasValue)
                        {
                            mediaArticle.FileInformationsId = articleDto.FileInformationsId.Value;
                        }
                    }
                    else
                    {
                        return BadRequest("Článek není typu Media.");
                    }
                    break;
                default:
                    return BadRequest("Neznámý typ článku.");
            }

            await _context.SaveChangesAsync();

            // Načteme záznam z PostArticle, který obsahuje article type
            var postArticle = await _context.PostArticles.FirstOrDefaultAsync(pa => pa.ArticleId == article.Id);

            return Ok(new
            {
                Article = article,
                ArticleType = postArticle?.ArticleType
            });
        }


        // DELETE: api/Article/{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]

        public async Task<IActionResult> DeleteArticle(int id)
        {
            var article = await _context.Articles.FindAsync(id);
            if (article == null)
            {
                return NotFound();
            }

            _context.Articles.Remove(article);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

}

