namespace PixelDread.DTO
{
    public class OGDataDto
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Slug { get; set; }
        // Pokud se soubor nahrává samostatně a uloží se FileInformations, můžete sem přidat FileInformationsId
        public int? FileInformationsId { get; set; }
    }
}
