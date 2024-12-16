using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PixelDread.Data;
using PixelDread.Models;
using System;

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
    }
}
