using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PixelDread.DTO;
using PixelDread.Models;
using PixelDread.Services;
using System;
using System.Linq;
using System.Threading.Tasks;

[Route("api/tags")]
[ApiController]
public class TagController : ControllerBase
{
    private readonly ApplicationContext _context;

    public TagController(ApplicationContext context)
    {
        _context = context;
    }

    // ✅ Create a new tag
    [HttpPost]
    public async Task<IActionResult> CreateTag([FromBody] TagDto tagDto)
    {
        if (string.IsNullOrWhiteSpace(tagDto.Name))
        {
            return BadRequest("Tag name is required.");
        }

        var tag = new Tag { Name = tagDto.Name };

        _context.Tags.Add(tag);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTagById), new { id = tag.Id }, tag);
    }

    // ✅ Get all tags
    [HttpGet]
    public async Task<IActionResult> GetAllTags()
    {
        var tags = await _context.Tags.ToListAsync();
        return Ok(tags);
    }

    // ✅ Get a tag by ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetTagById(int id)
    {
        var tag = await _context.Tags.FindAsync(id);
        if (tag == null)
        {
            return NotFound("Tag not found.");
        }

        return Ok(tag);
    }

    // ✅ Update a tag
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTag(int id, [FromBody] TagDto tagDto)
    {
        var tag = await _context.Tags.FindAsync(id);
        if (tag == null)
        {
            return NotFound("Tag not found.");
        }

        if (string.IsNullOrWhiteSpace(tagDto.Name))
        {
            return BadRequest("Tag name cannot be empty.");
        }

        tag.Name = tagDto.Name;
        await _context.SaveChangesAsync();

        return Ok(tag);
    }

    // ✅ Delete a tag
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTag(int id)
    {
        var tag = await _context.Tags.FindAsync(id);
        if (tag == null)
        {
            return NotFound("Tag not found.");
        }

        _context.Tags.Remove(tag);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // ✅ Assign a tag to a post
    [HttpPost("assign")]
    public async Task<IActionResult> AssignTagToPost([FromBody] PostTagDto postTagDto)
    {
        var post = await _context.Posts.FindAsync(postTagDto.PostId);
        var tag = await _context.Tags.FindAsync(postTagDto.TagId);

        if (post == null || tag == null)
        {
            return NotFound("Post or Tag not found.");
        }

        var postTag = new PostTag
        {
            PostId = postTagDto.PostId,
            TagId = postTagDto.TagId
        };

        _context.PostTags.Add(postTag);
        await _context.SaveChangesAsync();

        return Ok(postTag);
    }

    // ✅ Remove a tag from a post
    [HttpDelete("remove")]
    public async Task<IActionResult> RemoveTagFromPost([FromBody] PostTagDto postTagDto)
    {
        var postTag = await _context.PostTags
            .FirstOrDefaultAsync(pt => pt.PostId == postTagDto.PostId && pt.TagId == postTagDto.TagId);

        if (postTag == null)
        {
            return NotFound("Tag is not assigned to this post.");
        }

        _context.PostTags.Remove(postTag);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
