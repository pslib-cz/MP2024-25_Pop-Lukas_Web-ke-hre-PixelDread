using System;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PixelDread.Models;

namespace PixelDread.Data
{
    public class ApplicationContext : IdentityDbContext<IdentityUser>
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
        }
        #region Dbsets

        public DbSet<Post> Posts { get; set; }
        public DbSet<Category> Categories { get; set; }
        public OGData OGData { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<PostTag> PostTags { get; set; }
        public DbSet<PostArticle> PostArticles { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<ArticleFAQ> ArticleFAQs { get; set; }
        public DbSet<ArticleLink> ArticleLinks { get; set; }
        public DbSet<ArticleMedia> ArticleMedias { get; set; }
        public DbSet<ArticleText> ArticleTexts { get; set; }
        #endregion
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var hasher = new PasswordHasher<IdentityUser>();
            var firstAdminGuid = Guid.NewGuid().ToString();
            var securityStamp = Guid.NewGuid().ToString();
            var adminRoleGuid = Guid.NewGuid().ToString();

            base.OnModelCreating(modelBuilder);

            //Post
            modelBuilder.Entity<Post>()
                .HasOne(b => b.OGData)
                .WithOne(i => i.Post)
                .HasForeignKey<OGData>(b => b.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            //PostTag
            modelBuilder.Entity<PostTag>()
                .HasKey(pt => new { pt.PostId, pt.TagId });

            modelBuilder.Entity<PostTag>()
                .HasOne(pt => pt.Post)
                .WithMany(p => p.PostTags)
                .HasForeignKey(pt => pt.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PostTag>()
                .HasOne(pt => pt.Tag)
                .WithMany(t => t.PostTags)
                .HasForeignKey(pt => pt.TagId)
                .OnDelete(DeleteBehavior.Cascade);

            //PostArticle
            modelBuilder.Entity<PostArticle>()
                .HasKey(pa => new { pa.PostId, pa.ArticleId });

            modelBuilder.Entity<PostArticle>()
                .HasOne(pa => pa.Post)
                .WithMany(p => p.PostArticles)
                .HasForeignKey(pa => pa.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PostArticle>()
                .HasOne(pa => pa.Article)
                .WithOne(a => a.PostArticle)
                .HasForeignKey<PostArticle>(pa => pa.ArticleId)
                .OnDelete(DeleteBehavior.Cascade);

            //ArticleTypes
            modelBuilder.Entity<ArticleText>().HasBaseType(typeof(Article));
            modelBuilder.Entity<ArticleFAQ>().HasBaseType(typeof(Article));
            modelBuilder.Entity<ArticleLink>().HasBaseType(typeof(Article));
            modelBuilder.Entity<ArticleMedia>().HasBaseType(typeof(Article));
            
            //AdminAndRoles
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
                new Category { Id = 1, Name = "Blog", Default = true },
                new Category { Id = 2, Name = "FAQ", Default = true },
                new Category { Id = 3, Name = "PatchNotes", Default = true }
            );
        }

    }
}
