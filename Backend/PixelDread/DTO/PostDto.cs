namespace PixelDread.DTO
{
    public class PostDto
    {
        public string? Name { get; set; }
        public List<ArticleDto> Articles { get; set; } = new List<ArticleDto>();

        public int? CategoryId { get; set; }

        public List<int>? TagIds { get; set; }
        public OGDataDto? OGData { get; set; }
        
    }
}
