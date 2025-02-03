namespace PixelDread.Models
{
    public class ArticleMedia : Article
    {
        public FileInformations FileInfo { get; set; }
        public int FileInformationsId { get; set; }
        public string ? Description { get; set; } 
        public string ? Alt { get; set; }
    }
}
