namespace PixelDread.DTOs
{
    public class OGDataRequest
    {
        public string ? Slug { get; set; }
        public string ? Title { get; set; }
        public string ? Description { get; set; }
        public string ? Media { get; set; }
        public string ? FileName { get; set; }
        public string ? ContentType { get; set; }
        public List<string> ? Keywords { get; set; }
    }
}
