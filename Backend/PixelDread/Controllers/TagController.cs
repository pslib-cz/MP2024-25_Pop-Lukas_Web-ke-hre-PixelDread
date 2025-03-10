using Microsoft.AspNetCore.Mvc;
using PixelDread.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PixelDread.Models;
using Microsoft.AspNetCore.Authorization;


namespace PixelDread.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public TagController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/Tag
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tag>>> GetTags()
        {
            var tags = await _context.Tags.ToListAsync();
            return Ok(tags);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Tag>> GetTag(int id)
        {
            var tag = await _context.Tags.FindAsync(id);
            if (tag == null)
            {
                return NotFound();
            }
            return Ok(tag);
        }
        [Authorize(Roles = "Admin")]
        [HttpPost]

        public async Task<ActionResult<Tag>> PostTag(Tag tag)
        {
            _context.Tags.Add(tag);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetTag", new { id = tag.Id }, tag);
        }
        [Authorize(Roles = "Admin")]

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTag(int id, [FromBody] Tag tag)
        {
            // Kontrola, zda ID v URL odpovídá ID v těle objektu tag
            if (id != tag.Id)
            {
                return BadRequest("ID v URL neodpovídá ID v objektu tag.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Entry(tag).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TagExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        [Authorize(Roles = "Admin")]
        // DELETE: api/Tag/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTag(int id)
        {
            var tag = await _context.Tags.FindAsync(id);
            if (tag == null)
            {
                return NotFound();
            }
            _context.Tags.Remove(tag);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        private bool TagExists(int id)
        {
            return _context.Tags.Any(e => e.Id == id);
        }
    }
}
