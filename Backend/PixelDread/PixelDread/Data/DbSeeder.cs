using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PixelDread.Models;

namespace PixelDread.Data
{
    public class DbSeeder
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            var hasher = new PasswordHasher<IdentityUser>();
            var firstAdminGuid = Guid.NewGuid().ToString();
            var securityStamp = Guid.NewGuid().ToString();
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
            // seed data
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Blog" },
                new Category { Id = 2, Name = "FAQ" },
                new Category { Id = 3, Name = "PatchNotes" }
            );

            modelBuilder.Entity<Blog>().HasData(
                new Blog { Id = 1, Date = System.DateTime.Now, Name = "Blog", Visibility = true, OGDataId = 1, AuthorId = firstAdminGuid }
            );

            modelBuilder.Entity<OGData>().HasData(
                new OGData { Id = 1, Title = "Blog", Description = "Blog", Keywords = ["something", "nothing"], Slug = "sdasdas" }
            );

            modelBuilder.Entity<BlogCategory>().HasData(
                new BlogCategory { BlogId = 1, CategoryId = 1 }
            );

            modelBuilder.Entity<BlogArticle>().HasData(
                new BlogArticle { BlogId = 1, ArticlePartId = 1 },
                new BlogArticle { BlogId = 1, ArticlePartId = 2 },
                new BlogArticle { BlogId = 1, ArticlePartId = 3 },
                new BlogArticle { BlogId = 1, ArticlePartId = 4 }
            );

            modelBuilder.Entity<ImageArticlePart>().HasData(
                new ImageArticlePart { Id = 1, Media = new byte[] { 0x00, 0x01, 0x02, 0x03 }, Description = "popis" }
            );

            modelBuilder.Entity<TextArticlePart>().HasData(
                new TextArticlePart { Id = 2, Content = "Hello World" }
            );

            modelBuilder.Entity<FAQArticlePart>().HasData(
                new FAQArticlePart { Id = 3, Question = "What is this?", Answer = "This is a blog." }
            );

            modelBuilder.Entity<LinkArticlePart>().HasData(
                new LinkArticlePart { Id = 4, url = "https://www.google.com", placeholder = "Google" }
                );
            
        }
    }
}
