using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PixelDread.Data;
using PixelDread.Models;
using PixelDread.DTOs;
using System;
using System.Security.Claims;

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

        // GET: api/Blogs
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
        [Route("CreateBlogWithCategories")]
        public async Task<ActionResult<Blog>> CreateBlogWithCategories([FromBody] BlogWithCategoriesRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Name))
            {
                return BadRequest("Invalid blog data.");
            }

            var newBlog = new Blog
            {

                Name = request.Name,
                Content = request.Content,
                Date = DateTime.Now,
                AuthorId = User.FindFirstValue(ClaimTypes.NameIdentifier),

                Visibility = request.Visibility,
            };

            if (request.OGData != null)
            {
                var ogData = new OGData
                {
                    Slug = request.OGData.Slug,
                    Title = request.OGData.Title,
                    Description = request.OGData.Description,
                    Media = request.OGData.Media,
                    Keywords = request.OGData.Keywords ?? new List<string>()
                };
                newBlog.OGData = ogData;
            }

            _context.Blogs.Add(newBlog);
            await _context.SaveChangesAsync();

            if (request.CategoryIds != null && request.CategoryIds.Any())
            {
                foreach (var categoryId in request.CategoryIds)
                {
                    var category = await _context.Categories.FindAsync(categoryId);
                    if (category == null)
                    {
                        return NotFound($"Category with ID {categoryId} not found.");
                    }

                    _context.BlogCategories.Add(new BlogCategory
                    {
                        BlogId = newBlog.Id,
                        CategoryId = categoryId
                    });
                }
                await _context.SaveChangesAsync();
            }

            return CreatedAtAction("GetBlog", new { id = newBlog.Id }, newBlog);
        }
        // PUT: api/Blogs/UpdateBlog
        [HttpPut]
        [Route("UpdateBlog/{blogId}")]
        public async Task<IActionResult> UpdateBlog(int blogId, [FromBody] UpdateBlogRequest request)
        {
            var blog = await _context.Blogs.FindAsync(blogId);
            if (blog == null)
            {
                return NotFound($"Blog with ID {blogId} not found.");
            }

            blog.Name = request.Name ?? blog.Name;
            blog.Content = request.Content ?? blog.Content;
            blog.Visibility = request.Visibility ?? blog.Visibility;

            _context.Entry(blog).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // DELETE: api/Blogs/DeleteBlog/{blogId}
        [HttpDelete]
        [Route("DeleteBlog/{blogId}")]
        public async Task<IActionResult> DeleteBlog(int blogId)
        {
            var blog = await _context.Blogs
                .Include(b => b.BlogCategories)
                .Include(b => b.OGData)
                .FirstOrDefaultAsync(b => b.Id == blogId);

            if (blog == null)
            {
                return NotFound($"Blog with ID {blogId} not found.");
            }

            _context.BlogCategories.RemoveRange(blog.BlogCategories);

            if (blog.OGData != null)
            {
                _context.OGData.Remove(blog.OGData);
            }

            _context.Blogs.Remove(blog);

            await _context.SaveChangesAsync();
            return NoContent();
        }
        // PUT: api/Blogs/UpdateOGData/{blogId}
        [HttpPut]
        [Route("UpdateOGData/{blogId}")]
        public async Task<IActionResult> UpdateOGData(int blogId, [FromBody] OGDataRequest request)
        {
            var blog = await _context.Blogs
                .Include(b => b.OGData)
                .FirstOrDefaultAsync(b => b.Id == blogId);

            if (blog == null)
            {
                return NotFound($"Blog with ID {blogId} not found.");
            }

            if (blog.OGData == null)
            {
                var ogData = new OGData
                {
                    Slug = request.Slug,
                    Title = request.Title,
                    Description = request.Description,
                    Media = request.Media,
                    Keywords = request.Keywords ?? new List<string>()
                };
                blog.OGData = ogData;
                _context.Entry(ogData).State = EntityState.Added;
            }
            else
            {
                blog.OGData.Slug = request.Slug ?? blog.OGData.Slug;
                blog.OGData.Title = request.Title ?? blog.OGData.Title;
                blog.OGData.Description = request.Description ?? blog.OGData.Description;
                blog.OGData.Media = request.Media ?? blog.OGData.Media;
                blog.OGData.Keywords = request.Keywords ?? blog.OGData.Keywords;

                _context.Entry(blog.OGData).State = EntityState.Modified;
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }
        // DELETE: api/Blogs/DeleteOGData/{blogId}
        [HttpDelete]
        [Route("DeleteOGData/{blogId}")]
        public async Task<IActionResult> DeleteOGData(int blogId)
        {
            var blog = await _context.Blogs
                .Include(b => b.OGData)
                .FirstOrDefaultAsync(b => b.Id == blogId);

            if (blog == null)
            {
                return NotFound($"Blog with ID {blogId} not found.");
            }

            if (blog.OGData == null)
            {
                return BadRequest($"Blog with ID {blogId} does not have associated OGData.");
            }

            _context.OGData.Remove(blog.OGData);
            blog.OGData = null;
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // PUT: api/Blogs/UpdateBlogCategories/{blogId}
        [HttpPut]
        [Route("UpdateBlogCategories/{blogId}")]
        public async Task<IActionResult> UpdateBlogCategories(int blogId, [FromBody] List<int> categoryIds)
        {
            var blog = await _context.Blogs.FindAsync(blogId);
            if (blog == null)
            {
                return NotFound($"Blog with ID {blogId} not found.");
            }
            else if (categoryIds == null || !categoryIds.Any())
            {
                return BadRequest("Invalid category IDs.");
            }
            else if (categoryIds.Any(id => _context.Categories.Find(id) == null))
            {
                return NotFound("One or more categories not found.");
            }
            else if (categoryIds.Any(id => _context.BlogCategories.Any(bc => bc.BlogId == blogId && bc.CategoryId == id)))
            {
                return BadRequest("One or more categories already associated with the blog.");
            }
            else
            {
                foreach (var categoryId in categoryIds)
                {
                    _context.BlogCategories.Add(new BlogCategory
                    {
                        BlogId = blogId,
                        CategoryId = categoryId
                    });
                }
                await _context.SaveChangesAsync();
                return NoContent();
            }
        }
        // DELETE: api/Blogs/DeleteBlogCategory/{blogId}/{categoryId}
        [HttpDelete]
        [Route("DeleteBlogCategory/{blogId}/{categoryId}")]
        public
            async Task<IActionResult> DeleteBlogCategory(int blogId, int categoryId)
        {
            var blogCategory = await _context.BlogCategories
                .FirstOrDefaultAsync(bc => bc.BlogId == blogId && bc.CategoryId == categoryId);
            if (blogCategory == null)
            {
                return NotFound($"Blog with ID {blogId} does not have category with ID {categoryId}.");
            }
            _context.BlogCategories.Remove(blogCategory);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}