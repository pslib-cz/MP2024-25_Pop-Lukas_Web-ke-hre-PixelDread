using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PixelDread.Data;
using PixelDread.Models;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace PixelDread.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class BlogCategoryController : ControllerBase
    {
        private readonly BlogDbContext _context;
        public BlogCategoryController(BlogDbContext context)
        {
            _context = context;
        }

        // GET: api/BlogCategory
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BlogCategory>>> GetBlogCategories()
        {
            return await _context.BlogCategories.ToListAsync();
        }
        // GET: api/BlogCategories/GetBlogCategory/{id}
    }
}