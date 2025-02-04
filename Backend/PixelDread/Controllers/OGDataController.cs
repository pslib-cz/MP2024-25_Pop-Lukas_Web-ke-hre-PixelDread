using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PixelDread.Models;
using PixelDread.Services;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace PixelDread.Controllers
{
    [Route("api/ogdata")]
    [ApiController]
    public class OGDataController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public OGDataController(ApplicationContext context)
        {
            _context = context;
        }

        // ✅ GET: api/ogdata (Získání všech OGData)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OGData>>> GetOGData()
        {
            return await _context.OGDatas.Include(o => o.FileInformations).ToListAsync();
        }

        // ✅ GET: api/ogdata/{id} (Získání OGData podle ID)
        [HttpGet("{id}")]
        public async Task<ActionResult<OGData>> GetOGDataById(int id)
        {
            var ogData = await _context.OGDatas
                .Include(o => o.FileInformations)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (ogData == null)
            {
                return NotFound(new { message = "OGData not found." });
            }

            return ogData;
        }

        // ✅ GET: api/ogdata/slug/{slug} (Získání OGData podle Slugu)
        [HttpGet("slug/{slug}")]
        public async Task<ActionResult<OGData>> GetOGDataBySlug(string slug)
        {
            var ogData = await _context.OGDatas
                .Include(o => o.FileInformations)
                .FirstOrDefaultAsync(o => o.Slug == slug);

            if (ogData == null)
            {
                return NotFound(new { message = "OGData not found." });
            }

            return ogData;
        }

        // ✅ POST: api/ogdata (Vytvoření OGData)
        [HttpPost]
        public async Task<ActionResult<OGData>> CreateOGData(OGData ogData)
        {
            if (ogData == null)
            {
                return BadRequest(new { message = "Invalid OGData data." });
            }

            // ✅ Generování unikátního slugu
            ogData.Slug = GenerateSlug(ogData.Title);

            _context.OGDatas.Add(ogData);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOGDataById), new { id = ogData.Id }, ogData);
        }

        // ✅ PUT: api/ogdata/{id} (Úprava OGData)
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOGData(int id, OGData ogData)
        {
            if (id != ogData.Id)
            {
                return BadRequest(new { message = "Mismatched OGData ID." });
            }

            var existingOGData = await _context.OGDatas.FindAsync(id);
            if (existingOGData == null)
            {
                return NotFound(new { message = "OGData not found." });
            }

            existingOGData.Title = ogData.Title;
            existingOGData.Description = ogData.Description;
            existingOGData.FileInformationsId = ogData.FileInformationsId;
            existingOGData.PostId = ogData.PostId;

            // ✅ Aktualizace Slugu, pokud se změnil Title
            if (existingOGData.Title != ogData.Title)
            {
                existingOGData.Slug = GenerateSlug(ogData.Title);
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // ✅ DELETE: api/ogdata/{id} (Smazání OGData)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOGData(int id)
        {
            var ogData = await _context.OGDatas.FindAsync(id);
            if (ogData == null)
            {
                return NotFound(new { message = "OGData not found." });
            }

            _context.OGDatas.Remove(ogData);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // ✅ Generování unikátního Slugu (SEO-friendly URL)
        private string GenerateSlug(string title)
        {
            string slug = Regex.Replace(title.ToLower(), @"[^a-z0-9]+", "-").Trim('-');

            // ✅ Zkontrolovat, zda slug již existuje
            int count = 1;
            string uniqueSlug = slug;
            while (_context.OGDatas.Any(o => o.Slug == uniqueSlug))
            {
                uniqueSlug = $"{slug}-{count}";
                count++;
            }

            return uniqueSlug;
        }
    }
}
