using Microsoft.EntityFrameworkCore.Migrations;

namespace CDCNPM_FInal.Migrations
{
    public partial class C : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Invoices",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "InvoiceID",
                table: "Invoices");

            migrationBuilder.AddColumn<string>(
                name: "BookingID",
                table: "Invoices",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Invoices",
                table: "Invoices",
                column: "BookingID");

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_Bookings_BookingID",
                table: "Invoices",
                column: "BookingID",
                principalTable: "Bookings",
                principalColumn: "BookingID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_Bookings_BookingID",
                table: "Invoices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Invoices",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "BookingID",
                table: "Invoices");

            migrationBuilder.AddColumn<string>(
                name: "InvoiceID",
                table: "Invoices",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Invoices",
                table: "Invoices",
                column: "InvoiceID");
        }
    }
}
