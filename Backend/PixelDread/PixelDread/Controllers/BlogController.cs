using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PixelDread.Data;
using PixelDread.Models;
using System;

namespace PixelDread.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]

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
        // POST: api/Blogs
        [HttpPost]
        public async Task<ActionResult<Blog>> PostBlog(Blog blog)
        {
            blog.Date = DateTime.Now;
            _context.Blogs.Add(blog);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetBlog", new { id = blog.Id }, blog);
        }
        // DELETE: api/Blogs/id
        [HttpDelete]
        [Route("DeleteBlog/{id}")]
        public async Task<IActionResult> DeleteBlog(int id)
        {
            var blog = await _context.Blogs.FindAsync(id);
            if (blog == null)
            {
                return NotFound();
            }
            _context.Blogs.Remove(blog);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        // PUT: api/Blogs/id
        [HttpPut]
        [Route("PutBlog/{id}")]
        public async Task<IActionResult> PutBlog(int id, Blog blog)
        {
            if (id != blog.Id)
            {
                return BadRequest();
            }
            _context.Entry(blog).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }
        // make me api endpoint for adding category to blog
        [HttpPost]
        [Route("AddCategoryToBlog/{blogId}/{categoryId}")]
        public async Task<IActionResult> AddCategoryToBlog(int blogId, int categoryId)
        {
            var blog = await _context.Blogs.FindAsync(blogId);
            var category = await _context.Categories.FindAsync(categoryId);
            if (blog == null || category == null)
            {
                return NotFound();
            }
            _context.BlogCategories.Add(new BlogCategory { BlogId = blogId, CategoryId = categoryId });
            await _context.SaveChangesAsync();
            return NoContent();
        }
        // make me api endpoint for removing category from blog
        [HttpDelete]
        [Route("RemoveCategoryFromBlog/{blogId}/{categoryId}")]
        public async Task<IActionResult> RemoveCategoryFromBlog(int blogId, int categoryId)
        {
            var blogCategory = await _context.BlogCategories.FirstOrDefaultAsync(bc => bc.BlogId == blogId && bc.CategoryId == categoryId);
            if (blogCategory == null)
            {
                return NotFound();
            }
            _context.BlogCategories.Remove(blogCategory);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        // make me api endpoint for managing OGdata
        [HttpPost]
        [Route("AddOGDataToBlog/{blogId}")]
        public async Task<IActionResult> AddOGDataToBlog(int blogId, OGData ogData)
        {
            var blog = await _context.Blogs.FindAsync(blogId);
            if (blog == null)
            {
                return NotFound();
            }
            ogData.BlogId = blogId;
            _context.OGData.Add(ogData);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        [HttpPut]
        [Route("UpdateOGData/{blogId}")]
        public async Task<IActionResult> UpdateOGData(int blogId, OGData ogData)
        {
            var blog = await _context.Blogs.FindAsync(blogId);
            if (blog == null)
            {
                return NotFound();
            }
            ogData.BlogId = blogId;
            _context.Entry(ogData).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

    }
}
