using System.ComponentModel.DataAnnotations.Schema;

namespace PixelDread.Models
{
    public class OGData
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public FileInformations FileInformations { get; set; }
        public int FileInformationsId { get; set; }
        public int PostId { get; set; }
        public Post Post { get; set; }

    }
}
