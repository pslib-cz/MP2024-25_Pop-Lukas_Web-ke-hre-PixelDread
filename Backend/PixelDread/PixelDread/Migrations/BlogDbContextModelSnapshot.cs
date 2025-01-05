﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PixelDread.Data;

#nullable disable

namespace PixelDread.Migrations
{
    [DbContext(typeof(BlogDbContext))]
    partial class BlogDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.0");

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("TEXT");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("TEXT");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("TEXT");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("Admins", (string)null);

                    b.HasData(
                        new
                        {
                            Id = "224df757-26d3-45e6-840e-88813ed7e7c1",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "18a29945-aadf-4d55-aca0-20cb371e188b",
                            Email = "lukas@gmail.com",
                            EmailConfirmed = true,
                            LockoutEnabled = false,
                            NormalizedEmail = "LUKAS@GMAIL.COM",
                            NormalizedUserName = "LUKAS@GMAIL.COM",
                            PasswordHash = "AQAAAAIAAYagAAAAEKFkgvJABLEMAq4RRicidnZyZnVQNPaZON1NKAZvIbupY4ZEdApHFSFt/SIaP5Y+PA==",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "01474c1e-604d-4e93-aea0-3383da0787e7",
                            TwoFactorEnabled = false,
                            UserName = "lukas@gmail.com"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("TEXT");

                    b.Property<string>("RoleId")
                        .HasColumnType("TEXT");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("TEXT");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("Value")
                        .HasColumnType("TEXT");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("PixelDread.Models.ArticlePart", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ArticleType")
                        .IsRequired()
                        .HasMaxLength(13)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("ArticlePart");

                    b.HasDiscriminator<string>("ArticleType").HasValue("ArticlePart");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("PixelDread.Models.Blog", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("AuthorId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Date")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("OGDataId")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("Visibility")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.HasIndex("OGDataId")
                        .IsUnique();

                    b.ToTable("Blogs");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            AuthorId = "224df757-26d3-45e6-840e-88813ed7e7c1",
                            Date = new DateTime(2025, 1, 4, 15, 21, 25, 785, DateTimeKind.Local).AddTicks(4762),
                            Name = "Blog",
                            OGDataId = 1,
                            Visibility = true
                        });
                });

            modelBuilder.Entity("PixelDread.Models.BlogArticle", b =>
                {
                    b.Property<int>("BlogId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ArticlePartId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ArticleType")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Order")
                        .HasColumnType("INTEGER");

                    b.HasKey("BlogId", "ArticlePartId");

                    b.HasIndex("ArticlePartId");

                    b.ToTable("BlogArticles");

                    b.HasData(
                        new
                        {
                            BlogId = 1,
                            ArticlePartId = 1,
                            ArticleType = 0,
                            Order = 0
                        },
                        new
                        {
                            BlogId = 1,
                            ArticlePartId = 2,
                            ArticleType = 0,
                            Order = 0
                        },
                        new
                        {
                            BlogId = 1,
                            ArticlePartId = 3,
                            ArticleType = 0,
                            Order = 0
                        },
                        new
                        {
                            BlogId = 1,
                            ArticlePartId = 4,
                            ArticleType = 0,
                            Order = 0
                        });
                });

            modelBuilder.Entity("PixelDread.Models.BlogCategory", b =>
                {
                    b.Property<int>("BlogId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("CategoryId")
                        .HasColumnType("INTEGER");

                    b.HasKey("BlogId", "CategoryId");

                    b.HasIndex("CategoryId");

                    b.ToTable("BlogCategories");

                    b.HasData(
                        new
                        {
                            BlogId = 1,
                            CategoryId = 1
                        });
                });

            modelBuilder.Entity("PixelDread.Models.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Categories");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Blog"
                        },
                        new
                        {
                            Id = 2,
                            Name = "FAQ"
                        },
                        new
                        {
                            Id = 3,
                            Name = "PatchNotes"
                        });
                });

            modelBuilder.Entity("PixelDread.Models.OGData", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("BlogId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.PrimitiveCollection<string>("Keywords")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<byte[]>("Media")
                        .HasColumnType("BLOB");

                    b.Property<string>("Slug")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("OGData");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            BlogId = 0,
                            Description = "Blog",
                            Keywords = "[\"something\",\"nothing\"]",
                            Slug = "sdasdas",
                            Title = "Blog"
                        });
                });

            modelBuilder.Entity("PixelDread.Models.FAQArticlePart", b =>
                {
                    b.HasBaseType("PixelDread.Models.ArticlePart");

                    b.Property<string>("Answer")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Question")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasDiscriminator().HasValue("FAQ");

                    b.HasData(
                        new
                        {
                            Id = 3,
                            Answer = "This is a blog.",
                            Question = "What is this?"
                        });
                });

            modelBuilder.Entity("PixelDread.Models.ImageArticlePart", b =>
                {
                    b.HasBaseType("PixelDread.Models.ArticlePart");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<byte[]>("Media")
                        .IsRequired()
                        .HasColumnType("BLOB");

                    b.HasDiscriminator().HasValue("Image");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Description = "popis",
                            Media = new byte[] { 0, 1, 2, 3 }
                        });
                });

            modelBuilder.Entity("PixelDread.Models.LinkArticlePart", b =>
                {
                    b.HasBaseType("PixelDread.Models.ArticlePart");

                    b.Property<string>("placeholder")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("url")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasDiscriminator().HasValue("Link");

                    b.HasData(
                        new
                        {
                            Id = 4,
                            placeholder = "Google",
                            url = "https://www.google.com"
                        });
                });

            modelBuilder.Entity("PixelDread.Models.TextArticlePart", b =>
                {
                    b.HasBaseType("PixelDread.Models.ArticlePart");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasDiscriminator().HasValue("Text");

                    b.HasData(
                        new
                        {
                            Id = 2,
                            Content = "Hello World"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("PixelDread.Models.Blog", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", "Author")
                        .WithMany()
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PixelDread.Models.OGData", "OGData")
                        .WithOne("Blog")
                        .HasForeignKey("PixelDread.Models.Blog", "OGDataId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Author");

                    b.Navigation("OGData");
                });

            modelBuilder.Entity("PixelDread.Models.BlogArticle", b =>
                {
                    b.HasOne("PixelDread.Models.ArticlePart", "ArticlePart")
                        .WithMany()
                        .HasForeignKey("ArticlePartId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PixelDread.Models.Blog", "Blog")
                        .WithMany("BlogArticles")
                        .HasForeignKey("BlogId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ArticlePart");

                    b.Navigation("Blog");
                });

            modelBuilder.Entity("PixelDread.Models.BlogCategory", b =>
                {
                    b.HasOne("PixelDread.Models.Blog", "Blog")
                        .WithMany("BlogCategories")
                        .HasForeignKey("BlogId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PixelDread.Models.Category", "Category")
                        .WithMany("BlogCategories")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Blog");

                    b.Navigation("Category");
                });

            modelBuilder.Entity("PixelDread.Models.Blog", b =>
                {
                    b.Navigation("BlogArticles");

                    b.Navigation("BlogCategories");
                });

            modelBuilder.Entity("PixelDread.Models.Category", b =>
                {
                    b.Navigation("BlogCategories");
                });

            modelBuilder.Entity("PixelDread.Models.OGData", b =>
                {
                    b.Navigation("Blog")
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
