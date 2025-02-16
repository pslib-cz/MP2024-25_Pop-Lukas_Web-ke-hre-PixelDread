using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PixelDread.Services;
using System.Security.Claims;

namespace PixelDread.Controllers
{

    [Route("api/[controller]")]
    [Authorize (Roles = "Admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationContext _context;
        public AdminController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<IdentityUser>>> GetAdmins()
        {
            return await _context.Users.ToListAsync();
        }

        [HttpGet]
        [Route("CurrentUserId")]
        public ActionResult<string> GetCurrentUserId()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return NotFound("User ID not found.");
            }
            return Ok(userId);
        }
        // GET: api/GetAdmin/{id}
        [HttpGet]
        [Route("GetAdmin/{id}")]
        public async Task<ActionResult<IdentityUser>> GetAdmin(string id)
        {
            var admin = await _context.Users.FindAsync(id);
            if (admin == null)
            {
                return NotFound();
            }
            return admin;
        }

        [HttpDelete]
        [Route("DeleteAdmin/{id}")]
        public async Task<ActionResult<IdentityUser>> DeleteAdmin(string id)
        {
            var admin = await _context.Users.FindAsync(id);
            if (admin == null)
            {
                return NotFound();
            }
            _context.Remove(admin);
            await _context.SaveChangesAsync();
            return admin;
        }
        [HttpGet]
        [Route("Me")]
        public async Task<ActionResult<IdentityUser>> GetMe()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var admin = await _context.Users.FindAsync(userId);
            if (admin == null)
            {
                return NotFound();
            }
            return admin;
        }

}
}
