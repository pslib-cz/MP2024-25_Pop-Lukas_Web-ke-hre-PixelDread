namespace PixelDread.Models
{
    public class PostArticle
    {
        public int PostId { get; set; }
        public Post Post { get; set; }
        public int ArticleId { get; set; }  
        public Article Article { get; set; }
        public ArticleType ArticleType { get; set; }

        public int Order { get; set; }
    }
}
