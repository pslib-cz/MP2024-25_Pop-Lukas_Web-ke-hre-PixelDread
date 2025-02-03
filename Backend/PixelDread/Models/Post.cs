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

        [Required]
        public string Name { get; set; }

        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        [Required]
        public bool Visibility { get; set; }

        public IdentityUser? User { get; set; }
        public string? UserId { get; set; }

        public int? CategoryId { get; set; }

        [JsonIgnore]
        public Category? Category { get; set; }

        [JsonIgnore]
        public List<PostTag> PostTags { get; set; } = new List<PostTag>();

        [JsonIgnore]
        public List<PostArticle> PostArticles { get; set; } = new List<PostArticle>();

        public int? OGDataId { get; set; }

        [JsonIgnore]
        public OGData? OGData { get; set; }
    }
}
