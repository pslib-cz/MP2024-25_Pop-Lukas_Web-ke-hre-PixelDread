    using System;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;
    using PixelDread.Services;
    using PixelDread.Models;

    namespace PixelDread.Services
    {
        public class ApplicationContext : IdentityDbContext<IdentityUser>
        {

            public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
            {
            }
            #region Dbsets

            public DbSet<Post> Posts { get; set; }
            public DbSet<Category> Categories { get; set; }
            public DbSet<OGData> OGDatas { get; set; }
            public DbSet<Tag> Tags { get; set; }

            public DbSet<PostTag> PostTags { get; set; }
            public DbSet<PostArticle> PostArticles { get; set; }

            public DbSet<Article> Articles { get; set; }
            public DbSet<ArticleFAQ> ArticleFAQs { get; set; }
            public DbSet<ArticleLink> ArticleLinks { get; set; }
            public DbSet<ArticleMedia> ArticleMedias { get; set; }
            public DbSet<ArticleText> ArticleTexts { get; set; }

            public DbSet<FileInformations> FileInformations { get; set; }
        #endregion
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var hasher = new PasswordHasher<IdentityUser>();

            base.OnModelCreating(modelBuilder);

            var adminRoleGuid = Guid.NewGuid().ToString();
            var firstAdminGuid = Guid.NewGuid().ToString();
            var securityStamp = Guid.NewGuid().ToString();

            // Post
            modelBuilder.Entity<Post>()
                .HasOne(b => b.OGData)
                .WithOne(i => i.Post)
                .HasForeignKey<OGData>(b => b.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Post>()
                .HasOne(p => p.User)
                .WithMany()
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.SetNull);

            // OGData
            modelBuilder.Entity<OGData>()
                .HasOne(o => o.FileInformations)
                .WithOne()
                .HasForeignKey<OGData>(o => o.FileInformationsId);

            // ArticleMedia
            modelBuilder.Entity<ArticleMedia>()
                .HasOne(a => a.FileInformations)
                .WithOne()
                .HasForeignKey<ArticleMedia>(a => a.FileInformationsId);

            // PostTag
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

            // PostArticle
            modelBuilder.Entity<PostArticle>()
                .HasKey(pa => new { pa.PostId, pa.ArticleId });

            modelBuilder.Entity<PostArticle>()
                .HasOne(pa => pa.Post)
                .WithMany(p => p.PostArticles)
                .HasForeignKey(pa => pa.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PostArticle>()
                .HasOne(pa => pa.Article)
                .WithMany()
                .HasForeignKey(pa => pa.ArticleId)
                .OnDelete(DeleteBehavior.Cascade);

            // ArticleTypes
            modelBuilder.Entity<ArticleText>().HasBaseType(typeof(Article));
            modelBuilder.Entity<ArticleFAQ>().HasBaseType(typeof(Article));
            modelBuilder.Entity<ArticleLink>().HasBaseType(typeof(Article));
            modelBuilder.Entity<ArticleMedia>().HasBaseType(typeof(Article));

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
                    NormalizedEmail = "LUKAS@GMAIL.COM",
                    EmailConfirmed = true,
                    SecurityStamp = securityStamp,
                    PasswordHash = hasher.HashPassword(null, "tajneheslo123")
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

            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Blog" },
                new Category { Id = 2, Name = "FAQ" },
                new Category { Id = 3, Name = "PatchNotes" }
            );

            }
        }
    }
