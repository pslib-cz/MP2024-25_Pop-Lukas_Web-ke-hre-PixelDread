namespace PixelDread.Models
{
    public class ArticleMedia : Article
    {
        public IFormFile Media { get; set; }
        public string ? Description { get; set; } 
        public string ? Alt { get; set; }
    }
}
