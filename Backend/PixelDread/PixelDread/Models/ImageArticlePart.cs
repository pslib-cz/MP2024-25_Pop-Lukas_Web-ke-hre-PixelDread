using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace PixelDread.Models
{
    public class ImageArticlePart
    {
        public int Id { get; set; }
        public IFormFile Image { get; set; }
        public string Description { get; set; } 
        public int BlogId { get; set; } 
    }
}
