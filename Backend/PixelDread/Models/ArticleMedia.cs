namespace PixelDread.Models
{
    public class ArticleMedia : Article
    {
        public FileInfo FileInfo { get; set; }
        public int FileInfoId { get; set; }
        public string ? Description { get; set; } 
        public string ? Alt { get; set; }
    }
}
