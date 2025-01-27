namespace PixelDread.Models
{
    public class ArticleMedia : Article
    {
        public FileInfo Media { get; set; }
        public string ? Description { get; set; } 
        public string ? Alt { get; set; }
    }
}
