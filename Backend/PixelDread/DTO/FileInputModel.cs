namespace PixelDread.DTO
{
    public class FileInputModel
    {
        public string Title { get; set; }
        public string? Description { get; set; }
        public string? Alt { get; set; } //For ArticleMedia

        public IFormFile File { get; set; } 

        public int? PostId { get; set; } //For OGData
    }
}
