using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;

namespace PixelDread.Models
{
    public class OGData
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public FileInformations? FileInformations { get; set; }
        public int? FileInformationsId { get; set; }
        public string? Slug { get; set; }
        public int PostId { get; set; }
        public Post Post { get; set; }

    }
}
