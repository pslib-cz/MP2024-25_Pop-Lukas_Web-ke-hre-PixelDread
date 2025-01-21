using Microsoft.AspNetCore.Mvc;
using PixelDread.Data;
using PixelDread.Models;
using System.Threading.Tasks;


namespace PixelDread.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OGDataController : ControllerBase
    {
        private readonly BlogDbContext _context;

        public OGDataController(BlogDbContext context)
        {
            _context = context;
        }
        //GET: api/OGData{id}
        [HttpGet]
        [Route("GetOGData/{id}")]
        public async Task<ActionResult<OGData>> GetOGData(int id)
        {
            var ogData = await _context.OGData.FindAsync(id);
            if (ogData == null)
            {
                return NotFound();
            }
            return ogData;
        }
    }
}
