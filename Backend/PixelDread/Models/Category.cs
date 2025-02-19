using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PixelDread.Models
{
    public class Category
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Post> Posts { get; set; } = new List<Post>();

    }
}
