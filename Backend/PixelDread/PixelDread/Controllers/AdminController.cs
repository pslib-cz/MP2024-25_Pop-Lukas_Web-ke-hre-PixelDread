using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto.Generators;
using PixelDread.Data;

namespace PixelDread.Controllers
{
    [Authorize(Policy = "AdminPolicy")]

    [Route("api/[controller]")]

    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly BlogDbContext _context;
        public AdminController(BlogDbContext context)
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
        [HttpPut]
        [Route("UpdatePassword/{id}")]
        public async Task<IActionResult> UpdatePassword(string id, [FromBody] UpdatePasswordModel passwordModel)
        {
            var user = await _context.Users.FindAsync(id);
            if(user == null)
            {
                return NotFound();
            }
            user.PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(user, passwordModel.NewPassword);
            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpPut]
        [Route("UpdateEmail/{id}")]
        public async Task<IActionResult> UpdateEmail(string id, [FromBody] UpdateEmailModel emailModel)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            user.Email = emailModel.NewEmail;
            user.NormalizedEmail = emailModel.NewEmail.ToUpper();
            await _context.SaveChangesAsync();
            return Ok();
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

        public class UpdateEmailModel
        {
            public string NewEmail { get; set; }
        }

        public class UpdatePasswordModel
        {
            public string NewPassword { get; set; }
        }
    }

}