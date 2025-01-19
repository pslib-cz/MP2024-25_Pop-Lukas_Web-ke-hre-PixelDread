using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PixelDread.Data;

namespace PixelDread.Controllers
{

    [Route("api/[controller]")]
    [Authorize(Policy = "AdminPolicy")]

    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly BlogDbContext _context;
        public AdminController(BlogDbContext context)
        {
            _context = context;
        }

        // GET: api/Admin
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IdentityUser>>> GetAdmins()
        {
            return await _context.Users.ToListAsync();
        }
        [HttpGet]
        [Route("CurrentUserId")]
        public ActionResult<string> GetCurrentUserId()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return NotFound("User ID not found.");
            }
            return Ok(userId);
        }

        // PUT: api/UpdateAdmin/{id}
        [HttpPut]
        [Route("UpdateAdmin/{id}")]
        public async Task<ActionResult<IdentityUser>> UpdateAdmin(string id, IdentityUser admin)
        {
            if (id != admin.Id)
            {
                return BadRequest();
            }
            _context.Entry(admin).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return admin;
        }
        // DELETE: api/DeleteAdmin/{id}
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

    }

}