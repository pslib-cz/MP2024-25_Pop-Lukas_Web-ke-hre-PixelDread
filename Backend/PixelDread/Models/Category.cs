namespace PixelDread.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool ? Default { get; set; }

        public ICollection<Post> Posts { get; set; }

    }
}
