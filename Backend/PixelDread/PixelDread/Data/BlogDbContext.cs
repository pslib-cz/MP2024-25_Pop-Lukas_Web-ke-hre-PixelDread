using PixelDread.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Newtonsoft.Json;

namespace PixelDread.Data
{
    public class BlogDbContext : DbContext
    {
        public BlogDbContext(DbContextOptions<BlogDbContext> options) : base(options)
        {
        }

        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<BlogCategory> BlogCategories { get; set; }
        public DbSet<OGData> OGData { get; set; }
        public DbSet<BlogArticle> BlogArticles { get; set; }
        public DbSet<ImageArticlePart> ImageBlogParts { get; set; }
        public DbSet<TextArticlePart> TextBlogParts { get; set; }
        public DbSet<FAQArticlePart> FAQArticleParts { get; set; }
        public DbSet<LinkArticlePart> LinkArticleParts { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //JSON OGData
            modelBuilder.Entity<OGData>()
                .Property(o => o.Keywords)
                .HasConversion(
                    new ValueConverter<List<string>, string>(
                        v => JsonConvert.SerializeObject(v), // Serialize
                        v => JsonConvert.DeserializeObject<List<string>>(v)) // Deserialize
                )
                .HasColumnType("jsonb"); // PostgreSQL typ sloupce

            //OGData
            modelBuilder.Entity<Blog>()
                .HasOne(b => b.OGData)
                .WithOne(o => o.Blog)
                .HasForeignKey<Blog>(b => b.OGDataId)
                .OnDelete(DeleteBehavior.Cascade);
            //BlogCategory
            modelBuilder.Entity<BlogCategory>()
                .HasKey(bc => new { bc.BlogId, bc.CategoryId });

            modelBuilder.Entity<BlogCategory>()
                .HasOne(bc => bc.Blog)
                .WithMany(b => b.BlogCategories)
                .HasForeignKey(bc => bc.BlogId);

            modelBuilder.Entity<BlogCategory>()
                .HasOne(bc => bc.Category)
                .WithMany(c => c.BlogCategories)
                .HasForeignKey(bc => bc.CategoryId);
            //BlogArticle
            modelBuilder.Entity<BlogArticle>()
                .HasOne(ba => ba.Blog)
                .WithMany(b => b.BlogArticles)
                .HasForeignKey(ba => ba.BlogId);


        }
    }
}
