using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using PixelDread.Models;

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
            var hasher = new PasswordHasher<IdentityUser>();
            var firstAdminGuid = Guid.NewGuid().ToString();
            var securityStamp = Guid.NewGuid().ToString();
            var adminRoleGuid = Guid.NewGuid().ToString();

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Blog>()
                .HasOne(b => b.OGData)
                .WithOne(o => o.Blog)
                .HasForeignKey<Blog>(b => b.OGDataId)
                .OnDelete(DeleteBehavior.Cascade);

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

            modelBuilder.Entity<IdentityRole>().HasData(
                new IdentityRole
                {
                    Id = adminRoleGuid,
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                }
            );

            modelBuilder.Entity<IdentityUser>().HasData(
                new IdentityUser
                {
                    Id = firstAdminGuid,
                    UserName = "lukas@gmail.com",
                    NormalizedUserName = "LUKAS@GMAIL.COM",
                    Email = "lukas@gmail.com",
                    EmailConfirmed = true,
                    NormalizedEmail = "LUKAS@GMAIL.COM",
                    SecurityStamp = securityStamp,
                    PasswordHash = hasher.HashPassword(null, "heslo")
                }
            );

            modelBuilder.Entity<IdentityUserRole<string>>().HasData(
                new IdentityUserRole<string>
                {
                    RoleId = adminRoleGuid,
                    UserId = firstAdminGuid
                }
            );

            modelBuilder.Entity<IdentityUserClaim<string>>().HasData(
                new IdentityUserClaim<string>
                {
                    Id = 1,
                    UserId = firstAdminGuid,
                    ClaimType = "Admin",
                    ClaimValue = "true"
                }
            );

            // Seed Categories
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Blog", Basic = true },
                new Category { Id = 2, Name = "FAQ", Basic = true },
                new Category { Id = 3, Name = "PatchNotes", Basic = true }
            );
        }

    }
}
