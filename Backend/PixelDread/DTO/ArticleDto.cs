using System.ComponentModel.DataAnnotations;
using PixelDread.Models;

namespace PixelDread.DTO
{
    public class ArticleDto
    {
        [Required]

        public ArticleType Type { get; set; }
        public int Order { get; set; }

        public string? Content { get; set; } // For Text

        public string? Question { get; set; } // For FAQ
        public string? Answer { get; set; } // For FAQ

        public string? Url { get; set; } // For Link
        public string? Placeholder { get; set; } // For Link

        public string? Description { get; set; } // For Media
        public string? Alt { get; set; } // For Media
        public int? FileInformationsId { get; set; } // For Media

    }
}
