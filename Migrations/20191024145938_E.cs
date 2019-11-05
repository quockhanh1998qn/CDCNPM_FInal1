using Microsoft.EntityFrameworkCore.Migrations;

namespace CDCNPM_FInal.Migrations
{
    public partial class E : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DetailServices_Bookings_BookingID1",
                table: "DetailServices");

            migrationBuilder.DropIndex(
                name: "IX_DetailServices_BookingID1",
                table: "DetailServices");

            migrationBuilder.DropColumn(
                name: "BookingID1",
                table: "DetailServices");

            migrationBuilder.AddForeignKey(
                name: "FK_DetailServices_Bookings_BookingID",
                table: "DetailServices",
                column: "BookingID",
                principalTable: "Bookings",
                principalColumn: "BookingID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DetailServices_Bookings_BookingID",
                table: "DetailServices");

            migrationBuilder.AddColumn<string>(
                name: "BookingID1",
                table: "DetailServices",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_DetailServices_BookingID1",
                table: "DetailServices",
                column: "BookingID1");

            migrationBuilder.AddForeignKey(
                name: "FK_DetailServices_Bookings_BookingID1",
                table: "DetailServices",
                column: "BookingID1",
                principalTable: "Bookings",
                principalColumn: "BookingID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
