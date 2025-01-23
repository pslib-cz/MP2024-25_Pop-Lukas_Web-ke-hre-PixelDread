﻿namespace PixelDread.Models
{
    public class OGData
    {
        public int Id { get; set; }
        public string Slug { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public IFormFile Image { get; set; }

        public List<string> Keywords { get; set; }


        public int BlogId { get; set; }
        public Post Blog { get; set; }

    }
}
