using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PixelDread.Migrations
{
    /// <inheritdoc />
    public partial class Slahoun2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "5607b709-7151-4f1f-9028-c94412e96b66", "6c4d317d-efc9-4ccd-a2dd-f064d7d0c5d0" });

            migrationBuilder.DeleteData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: "6c4d317d-efc9-4ccd-a2dd-f064d7d0c5d0");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5607b709-7151-4f1f-9028-c94412e96b66");

            migrationBuilder.InsertData(
                table: "Admins",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "c251ed84-12d8-4a20-a2b6-603348953709", 0, "255f9066-d020-4fe1-ac4f-07ed763671f0", "lukas@gmail.com", true, false, null, "LUKAS@GMAIL.COM", "LUKAS@GMAIL.COM", "AQAAAAIAAYagAAAAEDpNTxKmbB7awsYnXBz2tn8LnKVeaJHqpEmAa4hYht6OmYWjlTQxRG9NGVcKGZ4acQ==", null, false, "e1d49897-59bf-4bcd-8876-45a5303f15f3", false, "lukas@gmail.com" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "794566b4-29f5-4e7f-b37e-c0b6e80dd81d", null, "Admin", "ADMIN" });

            migrationBuilder.UpdateData(
                table: "AspNetUserClaims",
                keyColumn: "Id",
                keyValue: 1,
                column: "UserId",
                value: "c251ed84-12d8-4a20-a2b6-603348953709");

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "794566b4-29f5-4e7f-b37e-c0b6e80dd81d", "c251ed84-12d8-4a20-a2b6-603348953709" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "794566b4-29f5-4e7f-b37e-c0b6e80dd81d", "c251ed84-12d8-4a20-a2b6-603348953709" });

            migrationBuilder.DeleteData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: "c251ed84-12d8-4a20-a2b6-603348953709");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "794566b4-29f5-4e7f-b37e-c0b6e80dd81d");

            migrationBuilder.InsertData(
                table: "Admins",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "6c4d317d-efc9-4ccd-a2dd-f064d7d0c5d0", 0, "b8f80d43-1f8e-43c2-9b5b-2b552e1af2fa", "lukas@gmail.com", true, false, null, "LUKAS@GMAIL.COM", "LUKAS@GMAIL.COM", "AQAAAAIAAYagAAAAEL4OykOndSHFjRQsH673tffFgRXu2Fr1gn0x+E4ncxbLwCxevWXPJ20mc2mo94y64g==", null, false, "023f5e79-2a00-4b64-a366-86ca0fca7dda", false, "lukas@gmail.com" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "5607b709-7151-4f1f-9028-c94412e96b66", null, "Admin", "ADMIN" });

            migrationBuilder.UpdateData(
                table: "AspNetUserClaims",
                keyColumn: "Id",
                keyValue: 1,
                column: "UserId",
                value: "6c4d317d-efc9-4ccd-a2dd-f064d7d0c5d0");

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "5607b709-7151-4f1f-9028-c94412e96b66", "6c4d317d-efc9-4ccd-a2dd-f064d7d0c5d0" });

            migrationBuilder.InsertData(
                table: "Posts",
                columns: new[] { "Id", "CategoryId", "CreatedAt", "Name", "OGDataId", "UpdatedAt", "UserId", "Visibility" },
                values: new object[] { 1, 2, null, null, null, null, "6c4d317d-efc9-4ccd-a2dd-f064d7d0c5d0", false });
        }
    }
}
