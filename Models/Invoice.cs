using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CDCNPM_FInal.Models
{
    public class Invoice
    {
        public Invoice(string invoiceID, string bookingID, DateTime invoice_Date, double invoice_Total, string user)
        {
            InvoiceID = invoiceID;
            BookingID = bookingID;
            Invoice_Date = invoice_Date;
            Invoice_Total = invoice_Total;
            User = user;
        }

        [Key]
        public string InvoiceID { get; set; }

        public string BookingID { get; set; }

        public DateTime Invoice_Date { get; set; }

        public double Invoice_Total { get; set; }

        public string User { get; set; }
        [ForeignKey("BookingID")]
        public Booking Booking { get; set; }


    }
}
