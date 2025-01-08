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
        public string AuthorId { get; set; }
        public string Content { get; set; }



        public List<BlogCategory> BlogCategories { get; set; }
        public OGData ? OGData { get; set; }

    }
}
