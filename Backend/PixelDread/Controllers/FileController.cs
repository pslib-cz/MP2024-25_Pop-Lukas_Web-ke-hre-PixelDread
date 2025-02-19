using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PixelDread.DTO;
using PixelDread.Models;
using PixelDread.Services;
using System;
using System.IO;
using System.Threading.Tasks;

namespace PixelDread.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IWebHostEnvironment _env;

        public FileController(ApplicationContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        [HttpPost("upload")]
        [Consumes("multipart/form-data")]  // Důležité pro Swagger generování
        public async Task<IActionResult> UploadFile([FromForm] FileInputModel fileModel)
        {
            // Ověření existence souboru
            if (fileModel.File == null || fileModel.File.Length == 0)
            {
                return BadRequest("Soubor nebyl nahrán.");
            }

            // Vytvoříme adresář /uploads pokud neexistuje
            var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            // Vygenerujeme unikátní jméno
            var uniqueFileName = Guid.NewGuid().ToString() + "_" + fileModel.File.FileName;
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            // Uložíme soubor na disk
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await fileModel.File.CopyToAsync(stream);
            }

            // Vytvoření záznamu o souboru
            var fileInfo = new FileInformations
            {
                FileName = uniqueFileName,
                FilePath = "/uploads/" + uniqueFileName,
                FileSize = fileModel.File.Length,
                UploadedAt = DateTime.UtcNow,

                // Využijeme i Name a Description, pokud chcete ukládat do DB
                // Můžete je uložit do extra sloupců v FileInformations
                // nebo je zatím ignorovat, pokud tabulka takové sloupce nemá
            };

            _context.FileInformations.Add(fileInfo);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                fileInfo.Id,
                fileInfo.FileName,
                fileInfo.FilePath,
                fileInfo.FileSize,
                fileInfo.UploadedAt,

                // A klidně vrátit i Name, Description pokud je ukládáte někam
                UploadedName = fileModel.Name,
                UploadedDescription = fileModel.Description
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFile(int id)
        {
            var file = await _context.FileInformations.FindAsync(id);
            if (file == null)
            {
                return NotFound("Soubor neexistuje v DB.");
            }

            var filePath = Path.Combine(_env.WebRootPath, file.FilePath.TrimStart('/'));
            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("Soubor neexistuje na disku.");
            }

            var fileBytes = await System.IO.File.ReadAllBytesAsync(filePath);
            // Můžete vrátit správný MIME, pokud víte, že jde např. o obrázek
            return File(fileBytes, "application/octet-stream", file.FileName);
        }
       

    }
}
