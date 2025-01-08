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
            optionsBuilder
                .ConfigureWarnings(warnings => warnings.Ignore(RelationalEventId.PendingModelChangesWarning));


        }
       
        public BlogDbContext(DbContextOptions<BlogDbContext> options) : base(options)
        {


        }
        #region DbSets
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<BlogCategory> BlogCategories { get; set; }
        public DbSet<OGData> OGData { get; set; }
        
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
        
            modelBuilder.Entity<IdentityUser>().ToTable("Admins");
            DbSeeder.Seed(modelBuilder);
        }
    }
}
