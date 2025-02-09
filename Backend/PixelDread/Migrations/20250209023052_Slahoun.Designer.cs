﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PixelDread.Services;

#nullable disable

namespace PixelDread.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    [Migration("20250209023052_Slahoun")]
    partial class Slahoun
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.12");

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

                    b.HasData(
                        new
                        {
                            Id = "60921401-1f5f-4a06-b147-66b0acf510f2",
                            Name = "Admin",
                            NormalizedName = "ADMIN"
                        });
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
                            Id = "8bf500e9-8572-4b08-888f-5ab4e542bd5f",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "cf4ceaa6-0f16-4d80-bea3-cdd07e513fa5",
                            Email = "lukas@gmail.com",
                            EmailConfirmed = true,
                            LockoutEnabled = false,
                            NormalizedEmail = "LUKAS@GMAIL.COM",
                            NormalizedUserName = "LUKAS@GMAIL.COM",
                            PasswordHash = "AQAAAAIAAYagAAAAELvLztFzCqIFrL5z1w6/aEkDUPAtWFOnBnYF+gM7XTW7Gvu4bcAz6LN9o5wMYgj7/A==",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "3700154a-324c-4e1f-b928-273ccd7c57ad",
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

                    b.HasData(
                        new
                        {
                            Id = 1,
                            ClaimType = "Admin",
                            ClaimValue = "true",
                            UserId = "8bf500e9-8572-4b08-888f-5ab4e542bd5f"
                        });
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

                    b.HasData(
                        new
                        {
                            UserId = "8bf500e9-8572-4b08-888f-5ab4e542bd5f",
                            RoleId = "60921401-1f5f-4a06-b147-66b0acf510f2"
                        });
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

            modelBuilder.Entity("PixelDread.Models.Article", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasMaxLength(13)
                        .HasColumnType("TEXT");

                    b.Property<int>("PostId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Articles");

                    b.HasDiscriminator().HasValue("Article");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("PixelDread.Models.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<bool?>("Default")
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
                            Default = true,
                            Name = "Blog"
                        },
                        new
                        {
                            Id = 2,
                            Default = true,
                            Name = "FAQ"
                        },
                        new
                        {
                            Id = 3,
                            Default = true,
                            Name = "PatchNotes"
                        });
                });

            modelBuilder.Entity("PixelDread.Models.FileInformations", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("FileName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("FilePath")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<long>("FileSize")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("UploadedAt")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("FileInformations");
                });

            modelBuilder.Entity("PixelDread.Models.OGData", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<int>("FileInformationsId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("PostId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Slug")
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("FileInformationsId")
                        .IsUnique();

                    b.HasIndex("PostId")
                        .IsUnique();

                    b.ToTable("OGDatas");
                });

            modelBuilder.Entity("PixelDread.Models.Post", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("CategoryId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<int?>("OGDataId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .HasColumnType("TEXT");

                    b.Property<bool>("Visibility")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("UserId");

                    b.ToTable("Posts");
                });

            modelBuilder.Entity("PixelDread.Models.PostArticle", b =>
                {
                    b.Property<int>("PostId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ArticleId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ArticleType")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Order")
                        .HasColumnType("INTEGER");

                    b.HasKey("PostId", "ArticleId");

                    b.HasIndex("ArticleId");

                    b.ToTable("PostArticles");
                });

            modelBuilder.Entity("PixelDread.Models.PostTag", b =>
                {
                    b.Property<int>("PostId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("TagId")
                        .HasColumnType("INTEGER");

                    b.HasKey("PostId", "TagId");

                    b.HasIndex("TagId");

                    b.ToTable("PostTags");
                });

            modelBuilder.Entity("PixelDread.Models.Tag", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Tags");
                });

            modelBuilder.Entity("PixelDread.Models.ArticleFAQ", b =>
                {
                    b.HasBaseType("PixelDread.Models.Article");

                    b.Property<string>("Answer")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Question")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasDiscriminator().HasValue("ArticleFAQ");
                });

            modelBuilder.Entity("PixelDread.Models.ArticleLink", b =>
                {
                    b.HasBaseType("PixelDread.Models.Article");

                    b.Property<string>("Placeholder")
                        .HasColumnType("TEXT");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasDiscriminator().HasValue("ArticleLink");
                });

            modelBuilder.Entity("PixelDread.Models.ArticleMedia", b =>
                {
                    b.HasBaseType("PixelDread.Models.Article");

                    b.Property<string>("Alt")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<int>("FileInformationsId")
                        .HasColumnType("INTEGER");

                    b.HasIndex("FileInformationsId")
                        .IsUnique();

                    b.HasDiscriminator().HasValue("ArticleMedia");
                });

            modelBuilder.Entity("PixelDread.Models.ArticleText", b =>
                {
                    b.HasBaseType("PixelDread.Models.Article");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasDiscriminator().HasValue("ArticleText");
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

            modelBuilder.Entity("PixelDread.Models.OGData", b =>
                {
                    b.HasOne("PixelDread.Models.FileInformations", "FileInformations")
                        .WithOne()
                        .HasForeignKey("PixelDread.Models.OGData", "FileInformationsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PixelDread.Models.Post", "Post")
                        .WithOne("OGData")
                        .HasForeignKey("PixelDread.Models.OGData", "PostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("FileInformations");

                    b.Navigation("Post");
                });

            modelBuilder.Entity("PixelDread.Models.Post", b =>
                {
                    b.HasOne("PixelDread.Models.Category", "Category")
                        .WithMany("Posts")
                        .HasForeignKey("CategoryId");

                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.Navigation("Category");

                    b.Navigation("User");
                });

            modelBuilder.Entity("PixelDread.Models.PostArticle", b =>
                {
                    b.HasOne("PixelDread.Models.Article", "Article")
                        .WithMany()
                        .HasForeignKey("ArticleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PixelDread.Models.Post", "Post")
                        .WithMany("PostArticles")
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Article");

                    b.Navigation("Post");
                });

            modelBuilder.Entity("PixelDread.Models.PostTag", b =>
                {
                    b.HasOne("PixelDread.Models.Post", "Post")
                        .WithMany("PostTags")
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PixelDread.Models.Tag", "Tag")
                        .WithMany("PostTags")
                        .HasForeignKey("TagId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Post");

                    b.Navigation("Tag");
                });

            modelBuilder.Entity("PixelDread.Models.ArticleMedia", b =>
                {
                    b.HasOne("PixelDread.Models.FileInformations", "FileInformations")
                        .WithOne()
                        .HasForeignKey("PixelDread.Models.ArticleMedia", "FileInformationsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("FileInformations");
                });

            modelBuilder.Entity("PixelDread.Models.Category", b =>
                {
                    b.Navigation("Posts");
                });

            modelBuilder.Entity("PixelDread.Models.Post", b =>
                {
                    b.Navigation("OGData");

                    b.Navigation("PostArticles");

                    b.Navigation("PostTags");
                });

            modelBuilder.Entity("PixelDread.Models.Tag", b =>
                {
                    b.Navigation("PostTags");
                });
#pragma warning restore 612, 618
        }
    }
}
