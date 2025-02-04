using PixelDread.Models;

namespace PixelDread.DTO
{
    public class PostArticleDto
    {
        public int PostId { get; set; }
        public int ArticleId { get; set; }
        public ArticleType ArticleType { get; set; } 
        public int Order { get; set; }
    }
}
