using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PixelDread.DTO;
using PixelDread.Models;
using PixelDread.Services;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace PixelDread.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IWebHostEnvironment _env;


        public PostController(ApplicationContext context, UserManager<IdentityUser> userManager, IWebHostEnvironment env)
        {
            _context = context;
            _userManager = userManager;
            _env = env;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Post>>> GetPosts()
        {
            var posts = await _context.Posts
                .Include(p => p.Category)
                .Include(p => p.User)
                .Include(p => p.PostTags).ThenInclude(pt => pt.Tag)
                .Include(p => p.PostArticles).ThenInclude(pa => pa.Article)
                .Include(p => p.OGData).ThenInclude(og => og.FileInformations)
                .ToListAsync();

            return Ok(posts);
        }

        // Zde předpokládáme, že data přijdou jako JSON (application/json),
        // takže používáme [FromBody]. Pokud byste chtěl multipart/form-data,
        [HttpPost]
        public async Task<IActionResult> CreatePost([FromForm] PostDto postDto)
        {
            if (postDto.Articles == null || postDto.Articles.Count == 0)
            {
                return BadRequest("Příspěvek musí obsahovat alespoň jeden článek.");
            }

            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized("Uživatel musí být přihlášen.");
            }

            // Vytvoříme a uložíme Post, abychom získali jeho ID.
            var post = new Post
            {
                Name = postDto.Name,
                CreatedAt = DateTime.UtcNow,
                Visibility = true,
                UserId = user.Id,
                User = user,  // Uložení informací o autorovi
                CategoryId = postDto.CategoryId
            };

            _context.Posts.Add(post);
            await _context.SaveChangesAsync(); // Získáme vygenerované post.Id

            // Seznam vazeb mezi příspěvkem a články
            var postArticles = new List<PostArticle>();

            // Projdeme všechny články z DTO a vytvoříme entity
            foreach (var articleDto in postDto.Articles)
            {
                Article article = null;
                switch (articleDto.Type)
                {
                    case ArticleType.Text:
                        article = new ArticleText
                        {
                            Content = articleDto.Content ?? ""
                        };
                        break;
                    case ArticleType.FAQ:
                        article = new ArticleFAQ
                        {
                            Question = articleDto.Question ?? "",
                            Answer = articleDto.Answer ?? ""
                        };
                        break;
                    case ArticleType.Link:
                        article = new ArticleLink
                        {
                            Url = articleDto.Url ?? "",
                            Placeholder = articleDto.Placeholder
                        };
                        break;
                    case ArticleType.Media: //error here
                        var mediaArticle = new ArticleMedia
                        {
                            Description = articleDto.Description ?? "",
                            Alt = articleDto.Alt ?? ""
                        };
                        if (!articleDto.FileInformationsId.HasValue)
                        {
                            return BadRequest("FileId is required for media article.");
                        }

                        var file = await _context.FileInformations.FindAsync(articleDto.FileInformationsId.Value);
                        if (file == null)
                        {
                            return BadRequest("File not found.");
                        }

                        mediaArticle.FileInformationsId = file.Id;
                        article = mediaArticle;

                        break;
                    default:
                        continue;
                }

                if (article != null)
                {
                    // Nastavíme vazbu na post
                    article.PostId = post.Id;
                    _context.Articles.Add(article);

                    // Vytvoříme vazbu s využitím navigační vlastnosti (Article)
                    postArticles.Add(new PostArticle
                    {
                        PostId = post.Id,
                        Article = article, // Tím EF Core automaticky nastaví ArticleId
                        ArticleType = articleDto.Type,
                        Order = articleDto.Order
                    });
                }
            }

            // Uložíme všechny články najednou – tím se vygenerují jejich skutečná ID
            await _context.SaveChangesAsync();

            // Přidáme vazby mezi Post a Articles
            _context.PostArticles.AddRange(postArticles);
            await _context.SaveChangesAsync();

            // Zpracování tagů (pokud existují)
            if (postDto.TagIds != null && postDto.TagIds.Any())
            {
                foreach (var tagId in postDto.TagIds)
                {
                    var tag = await _context.Tags.FindAsync(tagId);
                    if (tag != null)
                    {
                        _context.PostTags.Add(new PostTag
                        {
                            PostId = post.Id,
                            TagId = tagId
                        });
                    }
                }
                await _context.SaveChangesAsync();
            }

            // Zpracování OGData (pokud existuje)
            if (postDto.OGDataId.HasValue)
            {
                var ogData = await _context.OGDatas.FindAsync(postDto.OGDataId.Value);
                if (ogData != null)
                {
                    post.OGData = ogData;
                    post.OGDataId = ogData.Id;
                    ogData.PostId = post.Id;
                    await _context.SaveChangesAsync();
                }
            }

            return CreatedAtAction(nameof(GetPostById), new { id = post.Id }, post);
        }



        [HttpGet("{id}")]
        public async Task<IActionResult> GetPostById(int id)
        {
            var post = await _context.Posts
                .Include(p => p.PostArticles)
                    .ThenInclude(pa => pa.Article)
                .Include(p => p.User)
                .Include(p => p.PostTags)
                    .ThenInclude(pt => pt.Tag)
                .Include(p => p.OGData)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (post == null)
            {
                return NotFound();
            }

            return Ok(post);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            // Načteme příspěvek včetně navigačních vlastností, abychom měli všechny související entity
            var post = await _context.Posts
                .Include(p => p.PostArticles)
                    .ThenInclude(pa => pa.Article)
                .Include(p => p.PostTags)
                .Include(p => p.OGData)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (post == null)
            {
                return NotFound();
            }

            // Shromáždíme FileInformations, které chceme odstranit – zpracujeme pouze mediální články
            var fileInfosToDelete = new List<FileInformations>();
            foreach (var pa in post.PostArticles)
            {
                if (pa.Article is ArticleMedia mediaArticle)
                {
                    var fileInfo = await _context.FileInformations.FindAsync(mediaArticle.FileInformationsId);
                    if (fileInfo != null)
                    {
                        fileInfosToDelete.Add(fileInfo);
                    }
                }
            }

            // Odstraníme příspěvek – pokud máte správně nastavené cascade delete, odstraní se i PostArticles, Articles, PostTags, OGData
            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            // Odstraníme fyzické soubory a záznamy FileInformations
            foreach (var fileInfo in fileInfosToDelete)
            {
                // Sestavíme absolutní cestu k souboru (odstraníme případné počáteční '/')
                var filePath = Path.Combine(_env.WebRootPath, fileInfo.FilePath.TrimStart('/'));
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
                _context.FileInformations.Remove(fileInfo);
            }
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpGet("by-category/{categoryId}")]
        public async Task<IActionResult> GetPostsByCategory(int categoryId)
        {
            var posts = await _context.Posts
                .Where(p => p.CategoryId == categoryId)
                .Include(p => p.Category)
                .Include(p => p.User)
                .Include(p => p.PostTags).ThenInclude(pt => pt.Tag)
                .Include(p => p.PostArticles).ThenInclude(pa => pa.Article)
                .Include(p => p.OGData).ThenInclude(og => og.FileInformations)
                .ToListAsync();

            if (!posts.Any())
            {
                return NotFound($"No posts found for category ID {categoryId}.");
            }

            return Ok(posts);
        }

    }


}
