using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PixelDread.Data;
using PixelDread.Models;
using PixelDread.DTOs;
using System;
using System.Security.Claims;
using System.Reflection.Metadata;
using System.Text.Json;

namespace PixelDread.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class BlogController : ControllerBase

    {
        private readonly BlogDbContext _context;
        public BlogController(BlogDbContext context)
        {
            _context = context;
        }

        // GET: api/Blog
        [HttpGet]

        public async Task<ActionResult<IEnumerable<Blog>>> GetBlogs()
        {
            return await _context.Blogs.ToListAsync();
        }
        // GET: api/Blogs/GetBlog/{id}
        [HttpGet]
        [Route("GetBlog/{id}")]

        public async Task<ActionResult<Blog>> GetBlog(int id)
        {
            var blog = await _context.Blogs.FindAsync(id);
            if (blog == null)
            {
                return NotFound();
            }
            return blog;
        }
        // POST: api/Blogs/CreateBlogWithCategories
        [HttpPost]  
        [Authorize(Policy = "AdminPolicy")]

        [Route("CreateBlogWithCategories")]

        public async Task<ActionResult<Blog>> CreateBlogWithCategories(BlogWithCategoriesRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Name))
            {
                return BadRequest();
            }

            var blog = new Blog
            {
                Name = request.Name,
                Content = request.Content,
                Visibility = request.Visibility,
                Date = DateTime.Now,
                AuthorId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
            };
            try
            {
                if (request.OGData != null)
                {
                    if (request.OGData.Media != null)
                    {
                        var ogData = new OGData
                        {
                            Media = request.OGData.Media,
                            ContentType = request.OGData.ContentType,
                            FileName = request.OGData.FileName,

                            Description = request.OGData.Description,
                            Title = request.OGData.Title,
                            Slug = request.OGData.Slug,
                            Keywords = request.OGData.Keywords ?? new List<string>()

                        };
                        _context.OGData.Add(ogData);
                        await _context.SaveChangesAsync();
                        blog.OGData = ogData;
                    }
                    else
                    {
                        var ogData = new OGData
                        {
                            Description = request.OGData.Description,
                            Title = request.OGData.Title,
                            Slug = request.OGData.Slug,
                            Keywords = request.OGData.Keywords ?? new List<string>()
                        };
                        _context.OGData.Add(ogData);
                        await _context.SaveChangesAsync();
                        blog.OGData = ogData;
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            _context.Blogs.Add(blog);
            await _context.SaveChangesAsync();

            if (request.CategoryIds != null && request.CategoryIds.Any())
            {
                foreach (var categoryId in request.CategoryIds)
                {
                    var category = await _context.Categories.FindAsync(categoryId);
                    if (category != null)
                    {
                        var blogCategory = new BlogCategory
                        {
                            BlogId = blog.Id,
                            CategoryId = category.Id
                        };
                        _context.BlogCategories.Add(blogCategory);
                    }
                }
                await _context.SaveChangesAsync();
            }
            return CreatedAtAction("GetBlog", new { id = blog.Id }, blog);
        }
    }



}
