namespace PixelDread.DTOs
{
    public class BlogWithCategoriesRequest
    {
        public string ? Name { get; set; }
        public string ? Content { get; set; }
        public bool Visibility { get; set; }
        public List<int> ? CategoryIds { get; set; }
        public OGDataRequest ? OGData { get; set; }
    }
}
