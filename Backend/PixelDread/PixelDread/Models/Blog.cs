using Microsoft.AspNetCore.Identity;

namespace PixelDread.Models
{
    public class Blog
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Name { get; set; }
        public bool Visibility { get; set; }
        public int OGDataId { get; set; }
        public IdentityUser ? Author { get; set; }
        public int AuthorId { get; set; }


        public List<BlogCategory> BlogCategories { get; set; }
        public List<BlogArticle> BlogArticles { get; set; }
        public OGData OGData { get; set; }

    }
}
