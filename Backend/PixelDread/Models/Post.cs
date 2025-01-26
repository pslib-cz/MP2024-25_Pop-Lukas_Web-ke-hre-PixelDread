using Microsoft.AspNetCore.Identity;

namespace PixelDread.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool Visibility { get; set; }
        public IdentityUser Author { get; set; }
        public int AuthorId { get; set; }

        public int PostCategoryId { get; set; }
        public List<PostTag> PostTags { get; set; }
        public List<PostArticle> PostArticles { get; set; }
        public int OGDataId { get; set; }

        public OGData OGData { get; set; }
    }
}
