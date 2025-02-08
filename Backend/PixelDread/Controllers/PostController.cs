using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PixelDread.DTO;
using PixelDread.Models;
using System;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using PixelDread.Services;

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

        [HttpPost]
        public async Task<IActionResult> CreatePost([FromForm] PostDto postDto)
        {
            // Kontrola, zda jsou k dispozici nějaké články
            if (postDto.Articles == null || postDto.Articles.Count == 0)
            {
                return BadRequest("Příspěvek musí obsahovat alespoň jeden článek.");
            }

            // Získání přihlášeného uživatele
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized("Uživatel musí být přihlášen.");
            }

            // Vytvoření nového příspěvku
            var post = new Post
            {
                Name = postDto.Name,
                CreatedAt = DateTime.UtcNow,
                Visibility = true,
                UserId = user.Id,
                CategoryId = postDto.CategoryId
            };
            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            var postArticles = new List<PostArticle>();

            // Zpracování článků
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

                    case ArticleType.Media:
                        var mediaArticle = new ArticleMedia
                        {
                            Description = articleDto.Description ?? "",
                            Alt = articleDto.Alt ?? ""
                        };

                        if (articleDto.File != null && articleDto.File.Length > 0)
                        {
                            // Vytvoření adresáře pro upload, pokud neexistuje
                            var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads");
                            if (!Directory.Exists(uploadsFolder))
                            {
                                Directory.CreateDirectory(uploadsFolder);
                            }
                            var uniqueFileName = Guid.NewGuid().ToString() + "_" + articleDto.File.FileName;
                            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                            // Uložení souboru na disk
                            using (var stream = new FileStream(filePath, FileMode.Create))
                            {
                                await articleDto.File.CopyToAsync(stream);
                            }

                            // Vytvoření záznamu o souboru
                            var fileInfo = new FileInformations
                            {
                                FileName = uniqueFileName,
                                FilePath = "/uploads/" + uniqueFileName,
                                FileSize = articleDto.File.Length,
                                UploadedAt = DateTime.UtcNow
                            };
                            _context.FileInformations.Add(fileInfo);
                            await _context.SaveChangesAsync(); // Získáme vygenerované ID

                            // Přiřazení nahraného souboru k mediálnímu článku
                            mediaArticle.FileInformationsId = fileInfo.Id;
                            mediaArticle.FileInformations = fileInfo;
                        }
                        article = mediaArticle;
                        break;

                    default:
                        continue;
                }

                if (article != null)
                {
                    // Nastavení cizího klíče – vztah článku k příspěvku
                    article.PostId = post.Id;
                    _context.Articles.Add(article);
                    await _context.SaveChangesAsync();

                    postArticles.Add(new PostArticle
                    {
                        PostId = post.Id,
                        ArticleId = article.Id,
                        ArticleType = articleDto.Type,
                        Order = articleDto.Order
                    });
                }
            }

            if (postArticles.Any())
            {
                _context.PostArticles.AddRange(postArticles);
                await _context.SaveChangesAsync();
            }

            // Zpracování tagů – přidáme pouze existující tagy
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

            // Zpracování OGData – pouze přiřazení existujícího záznamu
            if (postDto.OGDataId.HasValue)
            {
                // Předpokládáme, že DbSet pro OGData se jmenuje OGDatas
                var ogData = await _context.OGDatas.FindAsync(postDto.OGDataId.Value);
                if (ogData != null)
                {
                    post.OGData = ogData;
                    post.OGDataId = ogData.Id;
                    // V případě potřeby lze nastavit i zpětné propojení
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
    }
}




