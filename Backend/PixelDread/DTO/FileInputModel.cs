namespace PixelDread.DTO
{
    public class FileInputModel
    {
        public string Title { get; set; }

        public IFormFile File { get; set; } 

        public int? PostId { get; set; } //For OGData
    }
}
