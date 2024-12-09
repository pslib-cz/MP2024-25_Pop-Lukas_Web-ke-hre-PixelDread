namespace PixelDread.Models
{
    public class TextArticlePart
    {
        public int Id { get; set; }
        public string Content { get; set; } // HTML obsah
        public int BlogId { get; set; }
    }
}
