using PixelDread.Models;

namespace PixelDread.DTO
{
    public class CreateArticleDto
    {
        public ArticleType Type { get; set; }

        // For Text
        public string? Content { get; set; }

        // For Media (Image/Video)
        public int? FileInformationsId { get; set; }
        public string? Description { get; set; }
        public string? Alt { get; set; }

        // For Link
        public string? Url { get; set; }
        public string? Placeholder { get; set; }

        // For FAQ
        public string? Question { get; set; }
        public string? Answer { get; set; }
    }
}
