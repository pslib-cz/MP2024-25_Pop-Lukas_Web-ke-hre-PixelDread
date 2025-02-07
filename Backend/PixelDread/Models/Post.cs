using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

 namespace PixelDread.Models
{
    public class Post
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string? Name { get; set; }

        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        [Required]
        public bool Visibility { get; set; }

        public IdentityUser? User { get; set; }
        public string? UserId { get; set; }

        public int? CategoryId { get; set; }

        public Category? Category { get; set; }

        public List<PostTag> PostTags { get; set; } = new List<PostTag>();

        public List<PostArticle> PostArticles { get; set; } = new List<PostArticle>();

        public int? OGDataId { get; set; }

        public OGData? OGData { get; set; }
    }
}
