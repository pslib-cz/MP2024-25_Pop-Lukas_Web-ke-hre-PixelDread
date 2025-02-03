using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PixelDread.DTO;
using PixelDread.Models;
using PixelDread.Services;
using System;
using System.IO;
using System.Threading.Tasks;

[Route("api/files")]
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
    public async Task<IActionResult> UploadFile([FromForm] FileInputModel fileModel)
    {
        if (fileModel.File == null || fileModel.File.Length == 0)
        {
            return BadRequest("Soubor nebyl nahrán.");
        }

        var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads");
        if (!Directory.Exists(uploadsFolder))
        {
            Directory.CreateDirectory(uploadsFolder);
        }

        var uniqueFileName = Guid.NewGuid().ToString() + "_" + fileModel.File.FileName;
        var filePath = Path.Combine(uploadsFolder, uniqueFileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await fileModel.File.CopyToAsync(stream);
        }

        var fileInfo = new FileInformations
        {
            FileName = uniqueFileName,
            FilePath = "/uploads/" + uniqueFileName,
            FileSize = fileModel.File.Length,
            UploadedAt = DateTime.UtcNow
        };

        _context.FileInformations.Add(fileInfo);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            fileInfo.Id,
            fileInfo.FileName,
            fileInfo.FilePath,
            fileInfo.FileSize,
            fileInfo.UploadedAt
        });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetFile(int id)
    {
        var file = await _context.FileInformations.FindAsync(id);
        if (file == null)
        {
            return NotFound();
        }

        var filePath = Path.Combine(_env.WebRootPath, file.FilePath.TrimStart('/'));
        if (!System.IO.File.Exists(filePath))
        {
            return NotFound("Soubor neexistuje.");
        }

        var fileBytes = await System.IO.File.ReadAllBytesAsync(filePath);
        return File(fileBytes, "application/octet-stream", file.FileName);
    }
}
