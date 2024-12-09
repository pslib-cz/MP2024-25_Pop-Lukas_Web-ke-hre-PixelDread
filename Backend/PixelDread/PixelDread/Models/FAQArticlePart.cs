namespace PixelDread.Models
{
    public class FAQArticlePart
    {
        public int Id { get; set; }

        public string Question { get; set; }
        public string Answer { get; set; }
        public int BlogId { get; set; }
    }
}
