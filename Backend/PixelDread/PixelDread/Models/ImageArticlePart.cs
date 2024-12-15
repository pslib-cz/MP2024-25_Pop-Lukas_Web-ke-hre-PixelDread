using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace PixelDread.Models
{
    public class ImageArticlePart : ArticlePart
    {
        public byte[] Media { get; set; }
        public string Description { get; set; } 

    }
}
