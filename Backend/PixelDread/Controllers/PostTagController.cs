using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PixelDread.Models;
using PixelDread.Services;

namespace PixelDread.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostTagController : ControllerBase
    {
        private readonly ApplicationContext _context;
        public PostTagController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/PostTag
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostTag>>> GetPostTags()
        {
            return await _context.PostTags.ToListAsync();
        }
        // GET: api/PostTag/{PostId}
        [HttpGet("{PostId}")]
        public async Task<ActionResult<IEnumerable<PostTag>>> GetPostTags(int PostId)
        {
            return await _context.PostTags.Where(pt => pt.PostId == PostId).ToListAsync();
        }
        // POST: api/PostTag
        [HttpPost]
        public async Task<ActionResult<PostTag>> PostPostTag(PostTag postTag)
        {
            _context.PostTags.Add(postTag);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetPostTag", new { id = postTag.PostId }, postTag);
        }
        // DELETE: api/PostTag/{PostId}/{TagId}
        [HttpDelete("{PostId}/{TagId}")]
        public async Task<IActionResult> DeletePostTag(int PostId, int TagId)
        {
            var postTag = await _context.PostTags.Where(pt => pt.PostId == PostId && pt.TagId == TagId).FirstOrDefaultAsync();
            if (postTag == null)
            {
                return NotFound();
            }
            _context.PostTags.Remove(postTag);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}

