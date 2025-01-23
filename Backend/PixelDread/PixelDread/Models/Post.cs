using Microsoft.AspNet.Identity.EntityFramework;

namespace PixelDread.Models
{
    public class Post
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Name { get; set; }
        public bool Visibility { get; set; }
        public int OGDataId { get; set; }
        public IdentityUser? Author { get; set; }
        public int AuthorId { get; set; }


        public List<PostCategory> BlogCategories { get; set; }
        public List<PostArticle> BlogArticles { get; set; }
        public OGData OGData { get; set; }
    }
}
