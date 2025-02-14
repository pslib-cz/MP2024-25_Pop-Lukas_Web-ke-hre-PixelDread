﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        [HttpGet("first-articles/{postId}")]
        public async Task<IActionResult> GetFirstArticles(int postId)
        {
            // Vezmeme z tabulky PostArticles jen záznamy pro daný postId,
            // seřadíme podle Order a vezmeme první dva.
            var postArticles = await _context.PostArticles
                .Include(pa => pa.Article)
                .Where(pa => pa.PostId == postId)
                .OrderBy(pa => pa.Order)
                .Take(2)
                .ToListAsync();

            // Pokud žádné články nejsou, vrátíme 404
            if (!postArticles.Any())
            {
                return NotFound($"No articles found for post with ID {postId}.");
            }

            // Převedeme do anonymních objektů (nebo vlastního DTO), 
            // aby se subtypové vlastnosti vrátily v JSON
            var result = postArticles.Select<PostArticle, object>(pa =>
            {
                var a = pa.Article;
                return a switch
                {
                    ArticleText text => new
                    {
                        pa.PostId,
                        pa.ArticleId,
                        Type = "text",
                        text.Content,
                        pa.Order
                    },
                    ArticleFAQ faq => new
                    {
                        pa.PostId,
                        pa.ArticleId,
                        Type = "faq",
                        faq.Question,
                        faq.Answer,
                        pa.Order
                    },
                    ArticleLink link => new
                    {
                        pa.PostId,
                        pa.ArticleId,
                        Type = "link",
                        link.Url,
                        link.Placeholder,
                        pa.Order
                    },
                    ArticleMedia media => new
                    {
                        pa.PostId,
                        pa.ArticleId,
                        Type = "media",
                        media.Description,
                        media.FileInformationsId,
                        media.Alt,
                        pa.Order
                    },
                    _ => new
                    {
                        pa.PostId,
                        pa.ArticleId,
                        Type = "unknown",
                        pa.Order
                    }
                };
            });

            return Ok(result);
        }


    }
}
