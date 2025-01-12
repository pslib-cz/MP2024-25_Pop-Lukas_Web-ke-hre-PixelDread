namespace PixelDread.DTOs
{
    public class OGDataRequest
    {
        public string ? Slug { get; set; }
        public string ? Title { get; set; }
        public string ? Description { get; set; }
        public Byte[]? Media { get; set; }
        public List<string> ? Keywords { get; set; }
    }
}
