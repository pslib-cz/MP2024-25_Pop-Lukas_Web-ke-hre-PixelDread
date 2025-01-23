using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace PixelDread.Models
{
    public class ArticleImage : Article
    {
        public IFormFile Image { get; set; }
        public string ? Description { get; set; } 
    }
}
