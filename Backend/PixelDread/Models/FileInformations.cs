﻿namespace PixelDread.Models
{
    public class FileInformations
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public long FileSize { get; set; }
        public DateTime ? UploadedAt { get; set; }

    }
}
