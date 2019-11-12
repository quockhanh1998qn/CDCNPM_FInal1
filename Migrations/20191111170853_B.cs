using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CDCNPM_FInal.Migrations
{
    public partial class B : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DetailServices_Bookings_BookingID",
                table: "DetailServices");

            migrationBuilder.DropForeignKey(
                name: "FK_DetailServices_Services_ServiceID",
                table: "DetailServices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DetailServices",
                table: "DetailServices");

            migrationBuilder.DropIndex(
                name: "IX_DetailServices_BookingID",
                table: "DetailServices");

            migrationBuilder.DropColumn(
                name: "ID",
                table: "DetailServices");

            migrationBuilder.AlterColumn<string>(
                name: "ServiceID",
                table: "DetailServices",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "BookingID",
                table: "DetailServices",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_DetailServices",
                table: "DetailServices",
                columns: new[] { "BookingID", "ServiceID" });

            migrationBuilder.AddForeignKey(
                name: "FK_DetailServices_Bookings_BookingID",
                table: "DetailServices",
                column: "BookingID",
                principalTable: "Bookings",
                principalColumn: "BookingID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DetailServices_Services_ServiceID",
                table: "DetailServices",
                column: "ServiceID",
                principalTable: "Services",
                principalColumn: "ServiceID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DetailServices_Bookings_BookingID",
                table: "DetailServices");

            migrationBuilder.DropForeignKey(
                name: "FK_DetailServices_Services_ServiceID",
                table: "DetailServices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DetailServices",
                table: "DetailServices");

            migrationBuilder.AlterColumn<string>(
                name: "ServiceID",
                table: "DetailServices",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "BookingID",
                table: "DetailServices",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<int>(
                name: "ID",
                table: "DetailServices",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_DetailServices",
                table: "DetailServices",
                column: "ID");

            migrationBuilder.CreateIndex(
                name: "IX_DetailServices_BookingID",
                table: "DetailServices",
                column: "BookingID");

            migrationBuilder.AddForeignKey(
                name: "FK_DetailServices_Bookings_BookingID",
                table: "DetailServices",
                column: "BookingID",
                principalTable: "Bookings",
                principalColumn: "BookingID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DetailServices_Services_ServiceID",
                table: "DetailServices",
                column: "ServiceID",
                principalTable: "Services",
                principalColumn: "ServiceID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
