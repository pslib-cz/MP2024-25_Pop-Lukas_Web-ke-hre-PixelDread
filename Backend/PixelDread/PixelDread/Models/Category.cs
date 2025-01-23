namespace PixelDread.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<PostCategory> BlogCategories { get; set; }

    }
}
