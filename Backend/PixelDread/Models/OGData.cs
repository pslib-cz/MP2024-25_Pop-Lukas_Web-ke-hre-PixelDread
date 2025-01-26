﻿namespace PixelDread.Models
{
    public class OGData
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public IFormFile Image { get; set; }


        public int PostId { get; set; }
        public Post Post { get; set; }

    }
}
