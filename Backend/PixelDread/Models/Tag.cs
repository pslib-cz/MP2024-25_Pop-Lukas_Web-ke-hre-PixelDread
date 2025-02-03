﻿namespace PixelDread.Models
{
    public class Tag
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<PostTag> PostTags { get; set; } = new List<PostTag>();
    }
}
