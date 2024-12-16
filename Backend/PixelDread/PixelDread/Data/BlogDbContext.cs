using PixelDread.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace PixelDread.Data
{
    public class BlogDbContext : IdentityDbContext<IdentityUser>
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.ConfigureWarnings(warnings => warnings.Ignore(RelationalEventId.PendingModelChangesWarning));
            base.OnConfiguring(optionsBuilder);
        }

        public BlogDbContext(DbContextOptions<BlogDbContext> options) : base(options)
        {

        }
        #region DbSets
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<BlogCategory> BlogCategories { get; set; }
        public DbSet<OGData> OGData { get; set; }
        public DbSet<BlogArticle> BlogArticles { get; set; }
        public DbSet<ImageArticlePart> ImageBlogParts { get; set; }
        public DbSet<TextArticlePart> TextBlogParts { get; set; }
        public DbSet<FAQArticlePart> FAQArticleParts { get; set; }
        public DbSet<LinkArticlePart> LinkArticleParts { get; set; }
        #endregion
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


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
            // Nastavení spojovací tabulky
            modelBuilder.Entity<BlogArticle>()
                .HasKey(ba => new { ba.BlogId, ba.ArticlePartId });

            modelBuilder.Entity<BlogArticle>()
                .HasOne(ba => ba.Blog)
                .WithMany(b => b.BlogArticles)
                .HasForeignKey(ba => ba.BlogId);

            modelBuilder.Entity<BlogArticle>()
                .HasOne(ba => ba.ArticlePart)
                .WithMany()
                .HasForeignKey(ba => ba.ArticlePartId);


            // Nastavení dědičnosti
            modelBuilder.Entity<ArticlePart>()
                .HasDiscriminator<string>("ArticleType")
                .HasValue<FAQArticlePart>("FAQ")
                .HasValue<ImageArticlePart>("Image")
                .HasValue<LinkArticlePart>("Link")
                .HasValue<TextArticlePart>("Text");
            modelBuilder.Entity<IdentityUser>().ToTable("Admins");
            DbSeeder.Seed(modelBuilder);
        }
    }
}
