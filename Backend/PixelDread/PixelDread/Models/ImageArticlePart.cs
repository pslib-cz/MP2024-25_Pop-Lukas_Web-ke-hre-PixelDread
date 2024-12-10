using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace PixelDread.Models
{
    public class ImageArticlePart : ArticlePart
    {
        public IFormFile Image { get; set; }
        public string Description { get; set; } 

    }
}
