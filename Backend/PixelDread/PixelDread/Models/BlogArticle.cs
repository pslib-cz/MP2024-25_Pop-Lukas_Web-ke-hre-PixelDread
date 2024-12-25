namespace PixelDread.Models
{
    public class BlogArticle
    {
        public int BlogId { get; set; }
        public Blog ? Blog { get; set; }
        public int ArticlePartId { get; set; }
        public ArticlePart ? ArticlePart { get; set; }
        public ArticleType ArticleType { get; set; }

        public int Order { get; set; }
    }
}
